import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import defaultImage from '../../../images/placeholder.png';

import {
  deleteProductAction,
  getAllProductsAction,
} from '../../../store/actions/productActions';

import './AdminProductCard.css';

const { confirm } = Modal;

const AdminProductCard = ({ title, images, description, slug }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const productImage =
    images && images.length > 0 && images[0]?.url
      ? images[0].url
      : defaultImage;

  const productDescription = description?.trim()
    ? description.length > 150
      ? `${description.substring(0, 150).trim()}...`
      : description
    : 'No product description available.';

  const handleDeleteConfirm = () => {
    confirm({
      title: `Delete "${title}"?`,
      icon: <ExclamationCircleOutlined />,
      content:
        'This action cannot be undone. Are you sure you want to delete this product?',
      okText: 'Delete product',
      okType: 'danger',
      cancelText: 'Keep product',
      centered: true,

      onOk() {
        return dispatch(deleteProductAction(slug, user.token)).then(() =>
          dispatch(getAllProductsAction(20))
        );
      },
    });
  };

  return (
    <article className="shoply-product-card">
      {/* Product image */}
      <Link
        to={`/admin/allproducts/${slug}`}
        className="shoply-product-card__image-link"
        aria-label={`View or edit ${title}`}
      >
        <div className="shoply-product-card__image-wrap">
          <img
            className="shoply-product-card__image"
            src={productImage}
            alt={title || 'Product image'}
            loading="lazy"
          />

          <span className="shoply-product-card__image-label">
            SHOPLY / PRODUCT
          </span>

          <span className="shoply-product-card__image-action">
            <ArrowRightOutlined />
          </span>
        </div>
      </Link>

      {/* Product information */}
      <div className="shoply-product-card__body">
        <div className="shoply-product-card__heading">
          <h3 className="shoply-product-card__title">
            {title || 'Untitled product'}
          </h3>

          <span className="shoply-product-card__indicator">
            <span className="shoply-product-card__dot" />
            Listed
          </span>
        </div>

        <p className="shoply-product-card__description">{productDescription}</p>

        {/* Footer actions */}
        <div className="shoply-product-card__footer">
          <span className="shoply-product-card__reference">
            PRODUCT / {slug || 'N/A'}
          </span>

          <div className="shoply-product-card__actions">
            <Link
              to={`/admin/allproducts/${slug}`}
              className="shoply-product-card__edit"
              aria-label={`Edit ${title}`}
              title="Edit product"
            >
              <EditOutlined />
            </Link>

            <button
              type="button"
              className="shoply-product-card__delete"
              onClick={handleDeleteConfirm}
              aria-label={`Delete ${title}`}
              title="Delete product"
            >
              <DeleteOutlined />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AdminProductCard;
