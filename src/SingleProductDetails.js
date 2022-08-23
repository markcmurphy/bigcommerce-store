import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

export default function SingleProductDetails() {
  let { id } = useParams();

  const SINGLE_PRODUCT_QUERY = gql`
    query SingleProduct {
      site {
        product(entityId: ${id}) {
          id
          entityId
          name
          description
          brand {
            name
          }
          prices {
            price {
              value
              currencyCode
            }
          }
          images {
            edges {
              node {
                url320wide: url(width: 320)
                url640wide: url(width: 640)
                url960wide: url(width: 960)
                url1280wide: url(width: 1280)
              }
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(SINGLE_PRODUCT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="container" style={{ marginTop: '10%' }}>
      <div className="row">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <Link className={'breadcrumb-link'} to="/">
                Home
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col">
          <img
            src={data.site.product.images.edges[0].node.url320wide}
            alt={data.site.product.name}
          />
        </div>
        <div className="col-7">
          <h1>{data.site.product.name}</h1>
          <h2>{data.site.product.brand.name}</h2>
          <p>${data.site.product.prices.price.value}</p>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div
          className="col"
          dangerouslySetInnerHTML={{ __html: data.site.product.description }}
        ></div>
      </div>
    </div>
  );
}
