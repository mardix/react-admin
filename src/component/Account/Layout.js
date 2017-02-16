
import React, {Component} from 'react';
import  * as BS  from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';


export default (props) =>
    <BS.Grid>
        <BS.Grid>
            <BS.Row>
                <BS.Col md={12}>
                    <BS.Nav bsStyle="tabs" justified activeKey={1}>
                        <IndexLinkContainer to="/account">
                            <BS.NavItem>Home</BS.NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to="/account/api-keys">
                            <BS.NavItem>My API Keys</BS.NavItem>
                        </LinkContainer>
                        <LinkContainer to="/account/my-account">
                            <BS.NavItem>My Account</BS.NavItem>
                        </LinkContainer>
                        <LinkContainer to="/account/upgrade">
                            <BS.NavItem>Upgrade</BS.NavItem>
                        </LinkContainer>
                        <LinkContainer to="/account/products">
                            <BS.NavItem>Products</BS.NavItem>
                        </LinkContainer>
                        <LinkContainer to="/account/logout">
                            <BS.NavItem>Logout</BS.NavItem>
                        </LinkContainer>
                    </BS.Nav>
                </BS.Col>
            </BS.Row>
        </BS.Grid>
        <BS.Row>
            <BS.Col md={12}>
                <div className="margin-top-40"></div>
                {props.children}
            </BS.Col>
        </BS.Row>
    </BS.Grid>

