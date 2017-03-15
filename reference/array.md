# array
* array[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, size_t N>
  struct array;
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
`array`は固定長のオブジェクトを保持するシーケンスコンテナで、各要素は連続して格納される。従来のCスタイルの配列のパフォーマンスを保ったまま、シーケンスのサイズの取得、要素の代入のサポートなど、標準コンテナの恩恵を受ける事ができる。また、境界チェック（範囲外の要素にアクセスしようとしていないかのチェック）付きの要素アクセスもサポートしている。

`array`は、デフォルトコンストラクタで構築された`array`オブジェクトが空でない点と、`swap()`の計算量が定数時間でない点を除いて、コンテナとリバーシブルコンテナの全ての要件を満たす。

テンプレートパラメータは、以下を意味する：

- `T` : 配列の要素型
- `N` : 配列の要素数。`0`以上であること


## メンバ関数

### 構築／破棄

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|-----------------|-------|
| [`(initializer)`](array/op_initializer.md) | `array`の初期化 | C++11 |


### 要素へのアクセス

| 名前 | 説明 | 対応バージョン |
|----------------------------------|--------------------------------|-------|
| [`at`](array/at.md)            | 境界チェック付きの要素アクセス | C++11 |
| [`operator[]`](array/op_at.md) | 境界チェック無しの要素アクセス | C++11 |
| [`front`](array/front.md)      | 先頭要素への参照を取得する | C++11 |
| [`back`](array/back.md)        | 末尾要素への参照を取得する | C++11 |
| [`data`](array/data.md)        | コンテナ内部に保持されている生の配列へ直接アクセスする | C++11 |


### イテレータ

| 名前 | 説明 | 対応バージョン
|---------------------------------|-----------------------------------------------------------|-------|
| [`begin`](array/begin.md)     | 先頭要素を指すイテレータを取得する | C++11 |
| [`end`](array/end.md)         | 末尾の1つ次の要素を指すイテレータを取得する | C++11 |
| [`cbegin`](array/cbegin.md)   | 先頭要素を指す読み取り専用イテレータを取得する | C++11 |
| [`cend`](array/cend.md)       | 末尾の次の要素を指す読み取り専用イテレータを取得する | C++11 |
| [`rbegin`](array/rbegin.md)   | 末尾の要素を指す逆イテレータを取得する | C++11 |
| [`rend`](array/rend.md)       | 先頭の1つ前の要素を指す逆イテレータを取得する | C++11 |
| [`crbegin`](array/crbegin.md) | 末尾の要素を指す読み取り専用逆イテレータを取得する | C++11 |
| [`crend`](array/crend.md)     | 先頭の1つ前の要素を指す読み取り専用逆イテレータを取得する | C++11 |


### 領域

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|----------------------------------|-------|
| [`empty`](array/empty.md)       | コンテナが空かどうかを判定する   | C++11 |
| [`size`](array/size.md)         | 要素数を取得する                 | C++11 |
| [`max_size`](array/max_size.md) | 格納可能な最大の要素数を取得する | C++11 |


### コンテナの変更

| 名前 | 説明 | 対応バージョン |
|---------------------------|-----------------------------------------------------|-------|
| [`fill`](array/fill.md) | コンテナを特定の要素で埋める                        | C++11 |
| [`swap`](array/swap.md) | 別の`array`オブジェクトとコンテナの中身を入れ替える | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------|------------------------------------------------------|-------|
| `reference`              | 要素の参照型 `T&` | C++11 |
| `const_reference`        | 読取り専用の要素の参照型 `const T&` | C++11 |
| `iterator`               | ランダムアクセスイテレータ (実装定義) | C++11 |
| `const_iterator`         | 読取り専用のランダムアクセスイテレータ (実装定義) | C++11 |
| `reverse_iterator`       | 逆イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | C++11 |
| `const_reverse_iterator` | 読み取り専用の逆イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | C++11 |
| `size_type`              | 符号なし整数型 [`size_t`](/reference/cstddef/size_t.md) | C++11 |
| `difference_type`        | 符号付き整数型 [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++11 |
| `pointer`                | 要素のポインタ型 `T*` | C++11 |
| `const_pointer`          | 読取り専用の要素のポインタ型 `const T*` | C++11 |
| `value_type`             | 要素の型 `T` | C++11 |


## 非メンバ関数

| 名前                                        | 説明                                   | 対応バージョン |
|---------------------------------------------|----------------------------------------|----------------|
| [`operator==`](array/op_equal.md)         | 等値比較                               | C++11          |
| [`operator!=`](array/op_not_equal.md)     | 非等値比較                             | C++11          |
| [`operator<`](array/op_less.md)           | 左辺が右辺より小さいかの判定を行う     | C++11          |
| [`operator<=`](array/op_less_equal.md)    | 左辺が右辺以下かの判定を行う           | C++11          |
| [`operator>`](array/op_greater.md)        | 左辺が右辺より大きいかの判定を行う     | C++11          |
| [`operator>=`](array/op_greater_equal.md) | 左辺が右辺以上かの判定を行う           | C++11          |
| [`swap`](array/swap_free.md)              | 2つの `array` オブジェクトを入れ替える | C++11          |


## タプルインタフェース

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`tuple_size`](array/tuple_size.md)       | 静的な要素数取得(class template)   | C++11 |
| [`tuple_element`](array/tuple_element.md) | 静的な要素の型取得(class template) | C++11 |
| [`get`](array/get.md)                     | 要素を取得する(function template)  | C++11 |

## 例
```cpp
#include <iostream>
#include <array>
#include <algorithm>

int main()
{
  // 3要素のint型配列を定義し、初期化子リストで初期化
  std::array<int, 3> ar = {3, 1, 4};

  // size()メンバ関数による要素数取得
  for (std::size_t i = 0; i < ar.size(); ++i) {
    ++ar[i]; // operator[]で任意の要素にランダムアクセス
  }

  // イテレータによる要素の横断
  std::for_each(ar.begin(), ar.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* ar.size()[link array/size.md]
* ar[i][link array/op_at.md]
* ar.begin()[link array/begin.md]
* ar.end()[link array/end.md]

### 出力
```
4
2
5
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0


## 関連項目
- [C++14 宣言時のメンバ初期化を持つ型の集成体初期化を許可](/lang/cpp14/brace_elision_in_array_temporary_initialization.md)


## 参照


