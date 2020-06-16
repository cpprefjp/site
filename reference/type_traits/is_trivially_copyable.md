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

ユーザーが関数を宣言したとき、`user-declared`であると言える。`= default`/`= delete`指定されたものも含む。

`user-provided`とは、`user-declared`なものから`= default`/`= delete`指定されたものを除くものである。

「トリビアルコピー可能な型」とは、「`std::memcpy()`可能な型である」と言い換えることもできる。これに分類される型は、以下の全ての条件を満たす必要がある：

- 全てのコピー/ムーブ コンストラクタ/代入演算子はtrivialもしくは`= delete`指定されている
- コピー/ムーブ コンストラクタ/代入演算子のうち少なくとも1つは`= delete`指定されていない
- trivialで`= delete`指定されていないデストラクタを持つ

これをもうすこし具体的に解釈する。

まずそのクラス自体に対して次の条件を満たす必要がある。

- デストラクターはvirtualではない
- デストラクターは`= delete`指定されていない
- デストラクタと全てのコピー/ムーブ コンストラクタ/代入演算子は`user-provided`ではない
- virtual関数を持たず、virtual基本クラスも持たない
- コピー/ムーブ コンストラクタ/代入演算子のうち少なくとも1つは`= delete`指定されていない

さらに非staticメンバ変数にも上記の5条件が適用される。

もし対象となるクラスが基底クラスを保つ場合(なにかを継承している場合)は、継承関係にあるクラスのうち基底クラス方向すべてのクラスが上記の5条件(非staticメンバ変数も)を満たす必要がある。

### 注意

トリビアルコピー可能の定義はかつては以下の全ての条件を満たすことを要求していた。

- 非トリビアルなコピーコンストラクタを持っていないこと
- 非トリビアルなムーブコンストラクタを持っていないこと
- 非トリビアルなコピー代入演算子を持っていないこと
- 非トリビアルなムーブ代入演算子を持っていないこと
- トリビアルなデストラクタを持っていること

しかし、デストラクタが削除されていてもトリビアルコピー可能となる問題があった。[CWG issue 1734](https://wg21.cmeerw.net/cwg/issue1734)によって定義が見直された。

## 例
```cpp example
#include <type_traits>

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

// 組み込み型は全てトリビアルコピー可能
static_assert(std::is_trivially_copyable<int>::value == true, "int is trivially copyable");
static_assert(std::is_trivially_copyable<int*>::value == true, "int* is trivially copyable");

// ユーザー定義型
static_assert(std::is_trivially_copyable<C1>::value == true, "C1 is trivially copyable");
static_assert(std::is_trivially_copyable<C2>::value == false, "C2 isn't trivially copyable");
static_assert(std::is_trivially_copyable<TrivialDestructor>::value == true, "TrivialDestructor is trivially copyable");

// CWG issue 1734が適用された環境ではトリビアルコピー可能ではない
static_assert(std::is_trivially_copyable<DeletedDestructor>::value == false, "DeletedDestructor isn't trivially copyable");

int main() {}
```
* std::is_trivially_copyable[color ff0000]

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
