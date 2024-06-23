import { db } from "../../db.js";

export const resolvers = {
    Query: {
        products: () => db.products,
        product: (parent: any, args: { productId: string }, context: any) => {
            const result = db.products.find(pd => pd.id === args.productId)
            return result;
        },
        categories: () => db.categories,
        category: (parent: any, args: { categoryId: string }, context: any) => {
            const result = db.categories.find(pd => pd.id === args.categoryId)
            return result;
        }
    },
    Product: {
        category: (parent: any) => {
            const result = db.categories.find(category => category.id === parent.categoryId)
            return result
        },
        reviews: (parent: any) => {
            return db.reviews.filter(review => review.productId === parent.id)
        }
    },
    Category: {
        products: (parent: any) => {
            return db.products.filter(pd => pd.categoryId === parent.id)
        }
    }
};