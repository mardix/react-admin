
import React, {Component} from 'react';
import  * as BS  from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default (props) =>
    <BS.Grid>
        <BS.Grid>
            <BS.Row>
                <BS.Col md={12}>
                    <BS.Nav bsStyle="tabs" justified activeKey={1}>
                        <LinkContainer to="/account/login">
                            <BS.NavItem>Login</BS.NavItem>
                        </LinkContainer>
                        <LinkContainer to="/account/register">
                            <BS.NavItem>Register</BS.NavItem>
                        </LinkContainer>
                        <LinkContainer to="/account/lost-password">
                            <BS.NavItem>Lost Password</BS.NavItem>
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
