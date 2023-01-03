const ReviewRepository = require("../repository/reviews.repository");

class ReviewService {
  reviewRepository = new ReviewRepository();

  //리뷰 생성
  createReview = async (grade, comment, user_id, laundry_id) => {
    const createReviewData = await this.reviewRepository.createReview(
      grade,
      comment,
      user_id,
      laundry_id
    );

    return createReviewData;
    // grade: createReviewData.grade,
    // comment: createReviewData.comment,
    // user_id: createReviewData.user_id
  };

  //리뷰 수정
  updateReview = async (id, grade, comment) => {
    try {
      const findReview = await this.reviewRepository.findReviewById(id);

      if (!findReview) throw new Error("리뷰가 존재하지 않아요.");

      const updateReview = await this.reviewRepository.updateReview(
        id,
        grade,
        comment
      );

      // const updateReview = await this.reviewRepository.findReviewById(id)

      return updateReview;
    } catch (error) {
      res.status(445).json({ errorMessage: error.message });
    }
  };

  //모든 리뷰 조회
  findAllReview = async () => {
    const allReview = await this.reviewRepository.findAllReview();

    allReview.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allReview.map((review) => {
      return {
        grade: review.grade,
        comment: review.comment,
      };
    });
  };

  //유저리뷰 조회
  getReview = async (user_id) => {
    const findReview = await this.reviewRepository.getReview(user_id);
    // console.log(findReview)
    return findReview;
  };

  //리뷰 삭제
  deleteReview = async (id) => {
    const findReview = await this.reviewRepository.findReviewById(id);
    if (!findReview) throw new Error("리뷰가 존재하지 않아요.");

    await this.reviewRepository.deleteReview(id);
  };
}

module.exports = ReviewService;