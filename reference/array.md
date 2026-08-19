# array
* array[meta header]
* cpp11[meta cpp]

`array`は固定長のオブジェクトを保持するシーケンスコンテナで、各要素は連続して格納される。従来のCスタイルの配列のパフォーマンスを保ったまま、シーケンスのサイズの取得、要素の代入のサポートなど、標準コンテナの恩恵を受ける事ができる。また、境界チェック（範囲外の要素にアクセスしようとしていないかのチェック）付きの要素アクセスもサポートしている。

`array`は、デフォルトコンストラクタで構築された`array`オブジェクトが空でない点と、`swap()`の計算量が定数時間でない点を除いて、コンテナとリバーシブルコンテナの全ての要件を満たす。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md)
- [`<compare>`](compare.md) (C++20)


## フリースタンディング
このヘッダのほとんどの機能は、フリースタンディング処理系でも使用できる。ただし、例外を送出する一部の機能などは、フリースタンディング処理系では提供されない、または削除される。詳細は各機能のページを参照。

## 機能一覧

| 名前 | 説明 | 対応バージョン |
|-----------------------------|----------------------------|-------|
| [`array`](array/array.md) | 固定長配列(class template) | C++11 |


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
- [P2407R5 Freestanding Library: Partial Classes](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2407r5.html)
    - C++26で、このヘッダのクラスが（例外を送出するメンバなど一部を除いて）フリースタンディング処理系に対応した
