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
クラステンプレート`hash`は、非順序連想コンテナ（[`unordered_map`](/reference/unordered_map/unordered_map.md)/[`unordered_multimap`](/reference/unordered_map/unordered_multimap.md)/[`unordered_set`](/reference/unordered_set/unordered_set.md)/[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md)）のキーとなる型のためのハッシュ値を計算する関数オブジェクトである。

このクラスはそのものにデフォルトの定義は存在せず、ユーザーが任意の型で特殊化する際の要件を定義する。`hash`クラステンプレートを特殊化する場合、後述するメンバ関数を持たせる必要がある。

### 基本型のハッシュサポート
`<functional>`ヘッダでは、基本型に対する特殊化を提供する。
`std::string`などC++標準ライブラリ定義の型に対する特殊化は、対象型を定義する各種ヘッダファイルにて提供される。

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
|------|------|
| `(constructor)` | デフォルトコンストラクタ、コピーコンストラクタ、ムーブコンストラクタを持つ |
| `(destructor)` | デストラクタを持つ |
| `operator=` | コピー代入演算子とムーブ代入演算子を持つ |
| `operator()` | 関数呼び出し演算子によって、キー値`k`に対応する`size_t`型のハッシュ値を返す。`const`修飾メンバ関数。 |

関数呼び出し演算子に関する制約は次の通り :

- 引数に指定するキー値`k`を変更してはならない。
- ハッシュ計算は引数で指定したキー値以外に依存してはいけない（状態をもってはいけない）。
- 式`k1 == k2`を満たす2個のキー値に対しては、同一ハッシュ値を返すこと。
    - 異なる2個のキーに対して同一ハッシュ値を返すこと（collision; 衝突）は許容されるが、入力に対する出力ハッシュ値は`size_t`型の値域において均等分布することが好ましい。


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `is_transparent` | 省略可。ハッシュ計算を行う関数オブジェクトがこの型を持っている場合、非順序連想コンテナの透過的な検索関数が有効になる。<br/>この型は、例えば関数オブジェクトが`string`型／`string_view`型／ヌル終端文字列(`const char*`)に対して等価なハッシュ値を生成できる場合に定義される。 | C++20 |


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <functional>

enum class E { A = 1, B = 42, C = 100 };

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

  // 列挙型の値E::Bに対するハッシュ値を求める（C++14から）
  E e = E::B;
  std::cout << std::hash<E>()(e) << std::endl;
}
```
* std::hash[color ff0000]

#### 出力例
```
67
100
1427109137
3219530756
42
```

### 透過的にハッシュ値を計算できる場合 (C++20)
メンバ型`is_transparent`が定義される場合、以下のようなコードにおいて、[`find`](/reference/unordered_map/unordered_map/find.md)メンバ関数に文字列リテラルを指定しても、一時的な[`string`](/reference/string/basic_string.md)オブジェクトが作成されず、パフォーマンス向上が期待できる。

```cpp example
#include <iostream>
#include <unordered_map>
#include <string>
#include <string_view>

struct string_hash {
  using is_transparent = void;
  // string/string_view/const char*共用ハッシュ計算
  size_t operator()(std::string_view sv) const {
    return std::hash<std::string_view>{}(sv);
  }
};

int main()
{
  // キー型=std::string, 値型=int
  std::unordered_map<std::string, int, string_hash, std::equal_to<>> um = {
    {"Alice", 3},
    {"Bob", 1},
    {"Carol", 4}
  };

  // string_hashおよびstd::equal_to<>はいずれもメンバ型にis_transparentを持つため、
  // find()などの検索関数に値を渡す場合に、キー型(std::string)一時オブジェクトが作られない
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
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| ヘッダ | 特殊化対象 |
|--------|------------|
| [`<coroutine>`](/reference/coroutine.md) | [`std::coroutine_handle`](/reference/coroutine/coroutine_handle.md) |
| [`<bitset>`](/reference/bitset.md) | [`std::bitset`](/reference/bitset/bitset.md) |
| [`<filesystem>`](/reference/filesystem.md) | [`std::filesystem::path`](/reference/filesystem/path.md) |
| [`<optional>`](/reference/optional.md) | [`std::optional`](/reference/optional/optional.md) |
| [`<memory>`](/reference/memory.md) | [`std::shared_ptr`](/reference/memory/shared_ptr.md), [`std::unique_ptr`](/reference/memory/unique_ptr.md) |
| [`<stacktrace>`](/reference/stacktrace.md) | [`std::basic_stacktrace`](/reference/stacktrace/basic_stacktrace.md), [`std::stacktrace_entry`](/reference/stacktrace/stacktrace_entry.md) |
| [`<string>`](/reference/string.md) | `std::string`など |
| [`<string_view>`](/reference/string_view.md) | `std::string_view`など |
| [`<system_error>`](/reference/system_error.md) | [`std::error_code`](/reference/system_error/error_code.md), [`std::error_condition`](/reference/system_error/error_condition.md) |
| [`<thread>`](/reference/thread.md) | [`std::thread::id`](/reference/thread/thread/id.md) |
| [`<typeindex>`](/reference/typeindex.md) | [`std::type_index`](/reference/typeindex/type_index.md) |
| [`<variant>`](/reference/variant.md) | [`std::variant`](/reference/variant/variant.md), [`std::monostate`](/reference/variant/monostate.md) |
| [`<vector>`](/reference/vector.md) | [`std::vector<bool>`](/reference/vector/vector.md) |


## 参照
- [ハッシュ関数 - Wikipedia](https://ja.wikipedia.org/wiki/ハッシュ関数)
- [LWG 2148 - Hashing enums should be supported directly by `std::hash`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2148)
- [LWG 2291 - std::hash is vulnerable to collision DoS attack](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2291)
- [LWG 2543 - LWG 2148 (hash support for enum types) seems under-specified](https://cplusplus.github.io/LWG/issue2543)
- [LWG 2817 - `std::hash` for `nullptr_t`](https://cplusplus.github.io/LWG/issue2817)
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
- [P1690R1 Refinement Proposal for P0919 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1690r1.html)
