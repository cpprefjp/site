# hash
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T> struct hash;

  // ハッシュ関数の特殊化
  template <> struct hash<bool>;
  template <> struct hash<char>;
  template <> struct hash<signed char>;
  template <> struct hash<unsigned char>;
  template <> struct hash<char8_t>;    // C++20
  template <> struct hash<char16_t>;
  template <> struct hash<char32_t>;
  template <> struct hash<wchar_t>;
  template <> struct hash<short>;
  template <> struct hash<unsigned short>;
  template <> struct hash<int>;
  template <> struct hash<unsigned int>;
  template <> struct hash<long>;
  template <> struct hash<long long>;
  template <> struct hash<unsigned long>;
  template <> struct hash<unsigned long long>;
  template <> struct hash<float>;
  template <> struct hash<double>;
  template <> struct hash<long double>;
  template <> struct hash<nullptr_t>;  // C++17
  template<class T> struct hash<T*>;
}
```

## 概要
クラステンプレート`hash`は、非順序連想コンテナ（[`unordered_map`](/reference/unordered_map/unordered_map.md)/[`unordered_multimap`](/reference/unordered_map/unordered_multimap.md)/[`unordered_set`](/reference/unordered_set/unordered_set.md)/[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md)）の�ーとなる型のためのハッシュ値を計算する関数オブジェクトである。

このクラスはそのものにデフォルトの定義は�在せず、ユーザーが任意の型で特殊化する際の要件を定義する。`hash`クラステンプレートを特殊化する場合、以下に記述するメンバ関数を持たせる必要がある。

なお、`<functional>`ヘッダでは、以下の特殊化を提供する：

| 型                   | 対応バージョン |
|----------------------|----------------|
| `bool`               | C++11          |
| `char`               | C++11          |
| `signed char`        | C++11          |
| `unsigned char`      | C++11          |
| `char8_t`            | C++20          |
| `char16_t`           | C++11          |
| `char32_t`           | C++11          |
| `wchar_t`            | C++11          |
| `short`              | C++11          |
| `unsigned short`     | C++11          |
| `int`                | C++11          |
| `unsigned int`       | C++11          |
| `long`               | C++11          |
| `long long`          | C++11          |
| `unsigned long`      | C++11          |
| `unsigned long long` | C++11          |
| `float`              | C++11          |
| `double`             | C++11          |
| `long double`        | C++11          |
| 全ての型へのポインタ | C++11          |
| 全ての列挙型         | C++14          |
| `nullptr_t`          | C++17          |


## メンバ関数

| 名前 | 説明 |
|-----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `hash()`<br/>`hash(const hash&)`<br/>`hash(hash&&)` | デフォルトコンストラクタ、コピーコンストラクタ、ムーブコンストラクタを持つ |
| `~hash()` | デストラクタを持つ |
| `hash& operator=(const hash&)`<br/>`hash& operator=(hash&&)` | コピー代入演算�とムーブ代入演算�を持つ |
| `size_t operator()(T key) const` | 関数呼び出し演算�によって、�ーに対応するハッシュ値を返す |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `result_type`           | 戻り値の型([`size_t`](/reference/cstddef/size_t.md)) | C++11 |
| `argument_type`         | 引数の型(�ーの型`T`) | C++11 |
| `transparent_key_equal` | 省略可。[`std::equal_to<void>`](equal_to.md)のような、`is_transparent`型を持ち、透過的な比較ができる関数オブジェクト型を指定する。<br/> ハッシュ計算の関数オブジェクトがこの型を持っている場合、非順序連想コンテナの透過的な検索関数が有効になる。<br/> 標準ライブラリの`hash`クラスの特殊化がこの型を持つかは未規定。<br/> この型は、例として`hash<string>`が`hash<const char*>`や`hash<string_view>`と�価なハッシュ値を生成できるような場合に定義される。 | C++20 |


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <functional>

int main()
{
  int x;

  // char型の値'C'に対するハッシュ値を求める
  std::cout << std::hash<char>()('C') << std::endl;

  // int型の値100に対するハッシュ値を求める
  std::cout << std::hash<int>()(100) << std::endl;

  // double型の値3.14に対するハッシュ値を求める
  std::cout << std::hash<double>()(3.14) << std::endl;

  // int*型のアドレス値(&x)に対するハッシュ値を求める
  std::cout << std::hash<int*>()(&x) << std::endl;
}
```
* std::hash[color ff0000]

#### 出力例
```
67
100
1427109137
3219530756
```

### 透過的にハッシュ値を計算できる場合 (C++20)
`transparent_key_equal`が定義される場合、以下のようなコードにおいて、`find()`メンバ関数に文�列リテラルを指定しても、一時的な[`string`](/reference/string/basic_string.md)オブジェクトが作成されず、パフォーマンス向上が期待できる。

```cpp example
#include <iostream>
#include <unordered_map>
#include <string>

int main()
{
  std::unordered_map<std::string, int> um = {
    {"Alice", 3},
    {"Bob", 1},
    {"Carol", 4}
  };

  // std::hash<std::string>がtransparent_key_equal型を持つ場合、
  // find()などの検索関数に引数を渡す場合に、std::string一時オブジェクトが作られない
  auto it = um.find("Alice");
  if (it != um.end()) {
    std::cout << "found : " << it->second << std::endl;
  }
}
```
* um.find[link /reference/unordered_map/unordered_map/find.md]
* um.end()[link /reference/unordered_map/unordered_map/end.md]

#### 出力
```
found : 3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [ハッシュ関数 - Wikipedia](https://ja.wikipedia.org/wiki/ハッシュ関数)
- [LWG 2148 - Hashing enums should be supported directly by std::hash](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2148)
- [LWG 2291 - std::hash is vulnerable to collision DoS attack](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2291)
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
