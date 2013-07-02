#array(C++11)
```cpp
namespace std {
  template <class T, size_t N>
  struct array;
}
```

##概要
`array`は固定長のオブジェクトを保持するシーケンスコンテナで、各要素は連続して格納される。従来のCスタイルの配列のパフォーマンスを保ったまま、シーケンスのサイズの取得、要素の代入のサポートなど、標準コンテナの恩恵を受ける事ができる。また、境界チェック（範囲外の要素にアクセスしようとしていないかのチェック）付きの要素アクセスもサポートしている。

`array`は、デフォルトコンストラクタで構築された`array`オブジェクトが空でない点と、`swap()`の計算量が定数時間でない点を除いて、コンテナとリバーシブルコンテナの全ての要件を満たす。


###メンバ関数

<b>構築／破棄</b>

| 名前 | 説明 |
|-------------------------------------|-----------------|
| [`(initializer)`](./array/array.md) | `array`の初期化 |


<b>要素へのアクセス</b>

| 名前 | 説明 |
|----------------------------------|--------------------------------------------------------|
| [`at`](./array/at.md)            | 境界チェック付きの要素アクセス |
| [`operator[]`](./array/op_at.md) | 境界チェック無しの要素アクセス |
| [`front`](./array/front.md)      | 先頭要素への参照を取得する |
| [`back`](./array/back.md)        | 末尾要素への参照を取得する |
| [`data`](./array/data.md)        | コンテナ内部に保持されている生の配列へ直接アクセスする |


<b>イテレータ</b>

| 名前 | 説明 |
|---------------------------------|-----------------------------------------------------------|
| [`begin`](./array/begin.md)     | 先頭要素を指すイテレータを取得する |
| [`end`](./array/end.md)         | 末尾の1つ次の要素を指すイテレータを取得する |
| [`cbegin`](./array/cbegin.md)   | 先頭要素を指す読み取り専用イテレータを取得する |
| [`cend`](./array/cend.md)       | 末尾の次の要素を指す読み取り専用イテレータを取得する |
| [`rbegin`](./array/rbegin.md)   | 末尾の要素を指す逆イテレータを取得する |
| [`rend`](./array/rend.md)       | 先頭の1つ前の要素を指す逆イテレータを取得する |
| [`crbegin`](./array/crbegin.md) | 末尾の要素を指す読み取り専用逆イテレータを取得する |
| [`crend`](./array/crend.md)     | 先頭の1つ前の要素を指す読み取り専用逆イテレータを取得する |


<b>領域</b>

| 名前 | 説明 |
|-----------------------------------|----------------------------------|
| [`empty`](./array/empty.md)       | コンテナが空かどうかを判定する   |
| [`size`](./array/size.md)         | 要素数を取得する                 |
| [`max_size`](./array/max_size.md) | 格納可能な最大の要素数を取得する |



<b>コンテナの変更</b>

| 名前 | 説明 |
|---------------------------|-----------------------------------------------------|
| [`fill`](./array/fill.md) | コンテナを特定の要素で埋める                        |
| [`swap`](./array/swap.md) | 別の`array`オブジェクトとコンテナの中身を入れ替える |


###メンバ型

| 名前 | 説明 |
|--------------------------|------------------------------------------------------------------------------------------------------------|
| `reference`              | 要素の参照型 `T&` |
| `const_reference`        | 読取り専用の要素の参照型 `const T&` |
| `iterator`               | ランダムアクセスイテレータ (実装定義) |
| `const_iterator`         | 読取り専用のランダムアクセスイテレータ (実装定義) |
| `reverse_iterator`       | 逆イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` |
| `const_reverse_iterator` | 読み取り専用の逆イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` |
| `size_type`              | 符号なし整数型 `size_t` |
| `difference_type`        | 符号付き整数型 `ptrdiff_t` |
| `pointer`                | 要素のポインタ型 `T*` |
| `const_pointer`          | 読取り専用の要素のポインタ型 `const T*` |
| `value_type`             | 要素の型 `T` |


###非メンバ関数

| 名前 | 説明 |
|------------------------------------------|--------------------------------------|
| [`operator==`](./array/op_equal.md)      | 等値比較 |
| [`operator!=`](./array/not_equal.md)     | 非等値比較 |
| [`operator<`](./array/less.md)           | 左辺が右辺より小さいかの判定を行う |
| [`operator<=`](./array/less_equal.md)    | 左辺が右辺以下かの判定を行う |
| [`operator>`](./array/greater.md)        | 左辺が右辺より大きいかの判定を行う |
| [`operator>=`](./array/greater_equal.md) | 左辺が右辺以上かの判定を行う |
| [`swap`](./array/swap_free.md)           | 2つの`array`オブジェクトを入れ替える |



<b>タプルインタフェース</b>

| 名前 | 説明 |
|---------------------------------------------|------------------------------------|
| [`tuple_size`](./array/tuple_size.md)       | 静的な要素数取得(class template)   |
| [`tuple_element`](./array/tuple_element.md) | 静的な要素の型取得(class template) |
| [`get`](./array/get.md)                     | 要素を取得する(function template)  |

##例
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

###出力
```
425
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


###参照


