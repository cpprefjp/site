# istream_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T, class CharT = char,
            class Traits = char_traits<CharT>, class Distance = ptrdiff_t>
  class istream_iterator
    : public iterator<input_iterator_tag, T, Distance, const T*, const T&>;
}
```
* char_traits[link /reference/string/char_traits.md]
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]
* iterator[link /reference/iterator/iterator.md]
* input_iterator_tag[link /reference/iterator/iterator_tag.md]

## 概要
`istream_iterator`は、`operator++()`でイテレータを進めることにより、入力ストリームの`operator>>()`でストリームからデータを読み込む入力イテレータである。

ストリームからの読み取りが`fail() == true`となる場合に、イテレータは`end`イテレータと等しくなる。


## 要件
- 型`T`が、デフォルト構築可能（*Cpp17DefaultConstructible*）、コピー構築可能（*Cpp17CopyConstructible*）、かつコピー代入可能（*Cpp17CopyAssignable*）の要件を満たすこと。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|-----------------------------------------------|-------|
| [`(constructor)`](istream_iterator/op_constructor.md) | コンストラクタ | |
| `~istream_iterator() = default` | デストラクタ | |
| `operator=(const istream_iterator&) = default`<br/>`operator=(istream_iterator&&) = default` | 代入演算子 | |
| [`operator*`](istream_iterator/op_deref.md) | 間接参照 | |
| [`operator->`](istream_iterator/op_arrow.md) | メンバアクセス | |
| [`operator++`](istream_iterator/op_increment.md) | イテレータをインクリメントする | |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------------|------------------------------------------------------------------------------------------|-------|
| `char_type`         | `CharT (デフォルトはchar)` | |
| `traits_type`       | `Traits (デフォルトはchar_traits<CharT>)` | |
| `istream_type`      | 入力ストリーム型 [`basic_istream`](/reference/istream/basic_istream.md)`<CharT, Traits>` | |
| `difference_type`   | `Distance` (デフォルトは`ptrdiff_t`) | |
| `pointer`           | `const T*` | |
| `value_type`        | `T` | |
| `iterator_category` | [`input_iterator_tag`](/reference/iterator/iterator_tag.md) | |
| `reference`         | `const T&` | |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------|-------|
| [`operator==`](istream_iterator/op_equal.md)     | 等値比較   | |
| [`operator!=`](istream_iterator/op_not_equal.md) | 非等値比較 | |



## 備考
このクラスは、フリースタンディング処理系では使用できない。

構築時および`++`のたびに、ストリームから型`T`の値を読み取って保持する。値の読み取りに失敗した場合 (ストリームの[`fail()`](/reference/ios/basic_ios/fail.md)が`true`を返す場合)、そのイテレータは終端イテレータと等値になる。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <sstream>
#include <algorithm>

int main()
{
  // 文字列の入力ストリームにデータを入れる
  std::stringstream ss;
  ss << 1 << std::endl
     << 2 << std::endl
     << 3;

  // 文字列の入力ストリームからデータを読み込むイテレータを作る
  std::istream_iterator<int> it(ss);
  std::istream_iterator<int> last;

  // イテレータを進めることにより、入力ストリームからデータを順に読み取る
  std::for_each(it, last, [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::istream_iterator[color ff0000]
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
1
2
3
```

## 関連項目
- [`basic_istream_view`](/reference/ranges/basic_istream_view.md): ストリームからデータを読み込むRange

## 参照
- [LWG Issue 788. Ambiguity in `[istream.iterator]`](https://cplusplus.github.io/LWG/issue788)
    - C++11で、終端イテレータと等値になる条件が「ストリームの終端に達した場合」から「型`T`の値の読み取りに失敗した場合 ([`fail()`](/reference/ios/basic_ios/fail.md)が`true`を返す場合)」へ改められた。書式エラーで抽出に失敗した場合の扱いが曖昧だったため
- [LWG Issue 2878. Missing `DefaultConstructible` requirement for `istream_iterator` default constructor](https://cplusplus.github.io/LWG/issue2878)
    - 型`T`が`DefaultConstructible`・`CopyConstructible`・`CopyAssignable`の要件を満たす必要があることが明記された
    - この修正は欠陥報告(DR)であり、C++98に遡及して適用される。メンバとして`T`のオブジェクトを保持する以上これらは実装上当初から必須だった要件であり、規定から抜け落ちていたものの明文化であるため
