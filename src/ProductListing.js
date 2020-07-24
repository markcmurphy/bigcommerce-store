import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  Link,
} from "react-router-dom";

export default function ProductListing() {
  const PRODUCT_QUERY = gql`
    query paginateProducts {
      site {
        products {
          pageInfo {
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              entityId
              name
              prices {
                price {
                  value
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(PRODUCT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data.site.products.edges.map((product) => (
    <ul key={product.node.entityId}>
      <li>
        <Link to={{ pathname: `product/${product.node.entityId}` }}>
          {product.node.name}
        </Link>
      </li>
    </ul>
  ));
}
