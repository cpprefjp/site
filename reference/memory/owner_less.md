# owner_less
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct owner_less; // C++11 先行宣言

  template <class T=void>
  struct owner_less; // C++17 void版プライマリテンプレート

  template <class T>
  struct owner_less<shared_ptr<T>>;

  template <class T>
  struct owner_less<weak_ptr<T>>;

  template <>
  struct owner_less<void>;
}
```
* shared_ptr[link /reference/memory/shared_ptr.md]
* weak_ptr[link /reference/memory/weak_ptr.md]

## 概要
`owner_less`は、スマートポインタを所有権ベースで小なり比較するための、2項関数オブジェクトである。

スマートポインタを、[`set`](/reference/set/set.md)や[`map`](/reference/map/map.md)の�ーにする際、値ベースではなく所有権ベースに比較することを指定するために使用する。


## shared_ptr版
### メンバ関数

| 名前                                  | 説明               | 対応バージョン |
|---------------------------------------|--------------------|-------|
| [`operator()`](owner_less/op_call.md) | 関数呼び出し演算� | C++11 |


### メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|---------------------------------------------------------------|-------|
| `result_type`          | 戻り値型`bool`                                                | C++11<br/> C++17から非推奨 |
| `first_argument_type`  | 第1引数型[`shared_ptr`](/reference/memory/shared_ptr.md)`<T>` | C++11<br/> C++17から非推奨 |
| `second_argument_type` | 第2引数型[`shared_ptr`](/reference/memory/shared_ptr.md)`<T>` | C++11<br/> C++17から非推奨 |


## weak_ptr版
### メンバ関数

| 名前                                  | 説明               | 対応バージョン |
|---------------------------------------|--------------------|-------|
| [`operator()`](owner_less/op_call.md) | 関数呼び出し演算� | C++11 |


### メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|-----------------------------------------------------------|-------|
| `result_type`          | 戻り値型`bool`                                            | C++11<br/> C++17から非推奨 |
| `first_argument_type`  | 第1引数型[`weak_ptr`](/reference/memory/weak_ptr.md)`<T>` | C++11<br/> C++17から非推奨 |
| `second_argument_type` | 第2引数型[`weak_ptr`](/reference/memory/weak_ptr.md)`<T>` | C++11<br/> C++17から非推奨 |


## void版
### メンバ関数

| 名前                                  | 説明               | 対応バージョン |
|---------------------------------------|--------------------|-------|
| [`operator()`](owner_less/op_call.md) | 関数呼び出し演算� | C++17 |

### メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|-----------------------------------------------------------|-------|
| `is_transparent` | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依�の型であるがあくまでタグ型であり、型そのものには意味はない。 | C++17 |


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <memory>
#include <map>

template <class Key, class Value>
using shared_ptr_map = std::map<
  std::shared_ptr<Key>,
  Value,
  std::owner_less<std::shared_ptr<Key>>
>;

struct X {
  int i;
  int j;
};

int main()
{
  shared_ptr_map<int, std::string> m;

  std::shared_ptr<int> p1(new int(2));

  std::shared_ptr<X> px(new X());
  // 同じ所有権(px)を持つが、異なるポインタを指すp2とp3
  std::shared_ptr<int> p2(px, &(px->i));
  std::shared_ptr<int> p3(px, &(px->j));

  m[p1] = "Alice";
  m[p2] = "Bob";
  m[p3] = "Carol"; // owner_lessでは、p2とp3が同じリソースを
                   // 指していると見なされるので、
                   // p2の要素が上書きされる

  std::cout << m.at(p1) << std::endl;
  std::cout << m.at(p2) << std::endl;
  std::cout << m.at(p3) << std::endl;
}
```
* std::owner_less[color ff0000]
* m.at[link /reference/map/map/at.md]

#### 出力
```
Alice
Carol
Carol
```

### void版のユースケース
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> sp1;
  std::shared_ptr<void> sp2;
  std::shared_ptr<long> sp3;
  std::weak_ptr<int> wp1;

  std::owner_less<void> cmp;

  // 異なる要素型同士の比較
  std::cout << std::boolalpha;
  std::cout << cmp(sp1, sp2) << std::endl; // void版以外ではコンパイルエラー
  std::cout << cmp(sp1, wp1) << std::endl;
  std::cout << cmp(sp1, sp3) << std::endl; // void版以外ではコンパイルエラー
  std::cout << cmp(wp1, sp1) << std::endl;
  std::cout << cmp(wp1, wp1) << std::endl; // void版以外ではコンパイルエラー
}
```

#### 出力
```
false
false
false
false
false
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013


## 関連項目
- [`shared_ptr::owner_before()`](/reference/memory/shared_ptr/owner_before.md)


## 参照
- [N2637 Revisiting `std::shared_ptr` comparison](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2637.pdf)
- [P0074R0 Making `std::owner_less` more flexible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0074r0.html)
- [P0005R4 Adopt `not_fn` from Library Fundamentals 2 for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0005r4.html)
