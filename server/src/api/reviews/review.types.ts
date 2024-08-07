import { Review, User } from '@/shared/models/entities';
import { Keys } from '@/shared/types/utils.types';
import type { Nullable } from '@/shared/types/utils.types';

export type GetReviewsRequestProps = {
    product_id: string;
    limit?: number;
    offset?: number;
    sortBy?: Keys<Pick<Review, 'rating' | 'date'>>;
    order?: 'ASC' | 'DESC';
};

export type CreateReviewRequestProps = Omit<Review, 'date'>;

export type UpdateReviewRequestProps = Omit<Review, 'date'>;

export type DeleteReviewRequestProps = Pick<Review, 'product_id' | 'user_id'>;

export type GetReviewsResponse = (Omit<Review, 'user_id'> & {
    author: Pick<User, 'user_id' | 'username' | 'avatar'>;
})[];

export type GetReviewOfUserProps = {
    user_id: string;
    product_id: string;
};

export type GetReviewOfUserResponse = {
    status: 'no_order' | 'no_review' | 'review_found';
    review: Nullable<Review>;
};
