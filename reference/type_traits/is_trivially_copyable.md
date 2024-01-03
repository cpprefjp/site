# is_trivially_copyable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_trivially_copyable;

  template <class T>
  inline constexpr bool is_trivially_copyable_v
    = is_trivially_copyable<T>::value;          // C++17
}
```

## 概要
型`T`がトリビアルコピー可能か調べる。


## 要件
型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。


## 効果

`is_trivially_copyable`は、`T`がトリビアルコピー可能な型であるならば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

「トリビアルコピー可能な型」とは、「`std::memcpy()`可能な型である」と言い換えることもできる。

トリビアルコピー可能な型の定義はこれまで2回変更されている。[CWG issue 1734](https://wg21.cmeerw.net/cwg/issue1734)による変更と、C++20での変更の2つだ。  
CWG issue 1734は2013年8月9日に報告されている。つまりC++14に対応した処理系はこれに対応している可能性があり、すくなくともC++17時点で規格書に修正が取り込まれている。

### 前提となる用語

`user-provided`な関数とは、`= default`/`= delete`指定されていない、ユーザーによって宣言された関数である。

### C++20

#### 資格のある特殊メンバ関数

資格のある特殊メンバ関数とは、特殊メンバ関数のうち、次の条件を満たすものを言う。

- `= delete`指定されていない
- 制約されている場合、それを満たしている
- 同じ種類の特殊メンバ関数の中でもっとも強く制約されている

同じ種類の特殊メンバ関数とは簡単に言うと、制約を除いて同一の宣言となる特殊メンバ関数のことである。

制約の詳細については[コンセプト](/lang/cpp20/concepts.md)にある解説を参照のこと。

例えば下の例を見てほしい。`optional`クラスは2つのコピーコンストラクタを持っている(#1と#2)。  
これらは最初の引数の型が等しいので、2つの同じ種類のコピーコンストラクタを持っているといえる。  
これらはいずれも`= delete`指定されていない。

`T=std::unique_ptr<int>`の場合、#1と#2はどちらも制約を満たさないので資格のあるコピーコンストラクタを持たない。  
`T=std::string`の場合、#2のみ制約を満たすので#2だけが資格のあるコピーコンストラクタである。  
`T=int`の場合、#1と#2はどちらも制約を満たすが、#1のほうが#2より強く制約されているので、#1だけが資格のあるコピーコンストラクタである。

```cpp example
#include <type_traits>
template <typename T>
concept trivially_copy_constructible = std::is_trivially_copy_constructible_v<T>;
template <typename T>
struct optional {
    // #1
    optional(optional const&)
        requires trivially_copy_constructible<T> && std::copy_constructible<T>
        = default;
    // #2
    optional(optional const& rhs)
            requires std::copy_constructible<T>;
};
```
* std::is_trivially_copy_constructible_v[link /reference/type_traits/is_trivially_copy_constructible.md]
* std::copy_constructible[link /reference/concepts/copy_constructible.md]

#### トリビアルコピー可能な型

トリビアルコピー可能な型とは、次の条件を満たすものをいう。

1. 少なくとも１つの資格のあるコピー/ムーブ コンストラクタ/代入演算子がある
2. 資格のあるコピー/ムーブ コンストラクタ/代入演算子それぞれはtrivialである
3. trivialで`= delete`指定されていないデストラクタを持つ

これをもうすこし具体的に解釈する。

まずそのクラス自体に対して次の条件を満たす必要がある。

- デストラクタはvirtualではない
- デストラクタは`= delete`指定されていない
- デストラクタと全ての**資格のある**コピー/ムーブ コンストラクタ/代入演算子は`user-provided`ではない
- virtual関数を持たず、virtual基本クラスも持たない
- 少なくとも１つの**資格のある**コピー/ムーブ コンストラクタ/代入演算子がある

対象となるクラスの非静的メンバ変数及び全ての基底クラスもトリビアルコピー可能でなければならない

### C++17もしくは[CWG issue 1734](https://wg21.cmeerw.net/cwg/issue1734)が適用された処理系

トリビアルコピー可能な型とは、次の条件を満たすものをいう。

- 全てのコピー/ムーブ コンストラクタ/代入演算子はtrivialもしくは`= delete`指定されている
- コピー/ムーブ コンストラクタ/代入演算子のうち少なくとも1つは`= delete`指定されていない
- trivialで`= delete`指定されていないデストラクタを持つ

これをもうすこし具体的に解釈する。

まずそのクラス自体に対して次の条件を満たす必要がある。

- デストラクタはvirtualではない
- デストラクタは`= delete`指定されていない
- デストラクタと全てのコピー/ムーブ コンストラクタ/代入演算子は`user-provided`ではない
- virtual関数を持たず、virtual基本クラスも持たない
- コピー/ムーブ コンストラクタ/代入演算子のうち少なくとも1つは`= delete`指定されていない

対象となるクラスの非静的メンバ変数及び全ての基底クラスもトリビアルコピー可能でなければならない

### [CWG issue 1734](https://wg21.cmeerw.net/cwg/issue1734)が適用されていないC++14以前の処理系

トリビアルコピー可能な型とは、次の条件を満たすものをいう。

- 非トリビアルなコピーコンストラクタを持っていないこと
- 非トリビアルなムーブコンストラクタを持っていないこと
- 非トリビアルなコピー代入演算子を持っていないこと
- 非トリビアルなムーブ代入演算子を持っていないこと
- トリビアルなデストラクタを持っていること

これをもうすこし具体的に解釈する。

まずそのクラス自体に対して次の条件を満たす必要がある。

- デストラクタはvirtualではない
- デストラクタと全てのコピー/ムーブ コンストラクタ/代入演算子は`user-provided`ではない
- virtual関数を持たず、virtual基本クラスも持たない

対象となるクラスの非静的メンバ変数及び全ての基底クラスもトリビアルコピー可能でなければならない

しかし、デストラクタが削除されていてもトリビアルコピー可能となる問題があった。

## 例
```cpp example
#include <type_traits>
#include <concepts>
#include <memory>
#include <string>
struct C1 {
  // 非トリビアルな特殊関数を持っていない

  // 特殊関数ではないメンバ関数は持っている
  int f(int x) const { return x; }
};

struct C2 {
  // デストラクタはuser-provided
  ~C2() {}
};

struct TrivialDestructor {
  // デストラクタはdefault指定されており、user-providedではない
  ~TrivialDestructor() = default;
};

struct DeletedDestructor {
  // デストラクタはdeleteされている
  ~DeletedDestructor() = delete;
};
#ifdef __cpp_concepts
template <typename T>
concept trivially_copy_constructible = std::is_trivially_copy_constructible_v<T>;
template <typename T>
struct optional {
  alignas(T) std::byte value[sizeof(T)];
  bool engaged;
  // #1: default指定されており、user-providedではない
  optional(optional const&)
      requires trivially_copy_constructible<T> && std::copy_constructible<T>
      = default;

  // #2: user-providedなコピーコンストラクタ
  optional(optional const& rhs)
          requires std::copy_constructible<T>
      : engaged(rhs.engaged)
  {
      if (engaged) {
          new (value) T(rhs.value);
      }
  }
};
#endif
// 組み込み型は全てトリビアルコピー可能
static_assert(std::is_trivially_copyable<int>::value == true, "int is trivially copyable");
static_assert(std::is_trivially_copyable<int*>::value == true, "int* is trivially copyable");

// ユーザー定義型
static_assert(std::is_trivially_copyable<C1>::value == true, "C1 is trivially copyable");
static_assert(std::is_trivially_copyable<C2>::value == false, "C2 isn't trivially copyable");
static_assert(std::is_trivially_copyable<TrivialDestructor>::value == true, "TrivialDestructor is trivially copyable");

// CWG issue 1734が適用された環境ではトリビアルコピー可能ではない
static_assert(std::is_trivially_copyable<DeletedDestructor>::value == false, "DeletedDestructor isn't trivially copyable");

#ifdef __cpp_concepts
// #1も#2も資格のあるコピーコンストラクタではなく、他に資格のあるコピー/ムーブ コンストラクタ/代入演算子がないためトリビアルコピー可能ではない
static_assert(std::is_trivially_copyable<optional<std::unique_ptr<int>>>::value == false, "std::unique_ptr<int> isn't trivially copyable");
// #2が資格のあるコピーコンストラクタであるが、user-providedであるためトリビアルコピー可能ではない
static_assert(std::is_trivially_copyable<optional<std::string>>::value == false, "optional<std::string> isn't trivially copyable");
// #1が資格のあるコピーコンストラクタであるのでトリビアルコピー可能
static_assert(std::is_trivially_copyable<optional<int>>::value == true, "optional<int> is trivially copyable");
#endif
int main() {}
```
* std::is_trivially_copyable[color ff0000]
* std::is_trivially_copy_constructible_v[link /reference/type_traits/is_trivially_copy_constructible.md]
* std::copy_constructible[link /reference/concepts/copy_constructible.md]
* std::byte[link /reference/cstddef/byte.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 5.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012～2013は、正しく実装されていない。`is_trivially_copy_constructible<T, U>`と同一の実装になっている。


## 参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型[`remove_all_extents`](remove_all_extents.md)`<T>::type`は、完全型か、`const`/`volatile`修飾された(あるいはされていない)`void`でなければならない。」に変更された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
- [CWG issue 1734. Nontrivial deleted copy functions](https://wg21.cmeerw.net/cwg/issue1734)
- [P0848R3 Conditionally Trivial Special Member Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0848r3.html)
