# reference_converts_from_temporary
* type_traits[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class T, class U>
  struct reference_converts_from_temporary;
}
```

## 概要
参照`T`が一時オブジェクト`U`をコピー初期化（代入形式による初期化）で束縛した時、その一時オブジェクトの寿命を延長するかを判定する。

[*INVOKE*](/reference/concepts/Invoke.md)`<R>`など、暗黙的な型変換のみが考慮される文脈におけるダングリング参照の生成を回避するために使用される。

なお、直接初期化（丸カッコによる初期化）における文脈では[`reference_constructs_from_temporary`](reference_constructs_from_temporary.md)が使用される。


## 要件
`T`と`U`のどちらも、完全型、`const`/`volatile`修飾された（あるいはされていない）`void`、要素数不明の配列型であること。


## 効果
`VAL<U>`を次のように定義する。

- `U`が参照型や関数型の場合、[`declval`](/reference/utility/declval.md)`<U>()`と同じ型と値カテゴリを持つ式
- `U`が参照型や関数型でない場合、型`U`である`prvalue`（ただし、`U`に`const`/`volatile`修飾があれば調整される）

[`conjunction_v`](conjunction.md)`<`[`is_reference`](is_reference.md)`<T>,` [`is_convertible`](is_convertible.md)`<U, T>>`が`true`かつ、`T t(VAL<U>)`において`t`が一時オブジェクトの寿命を延長する場合に[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 備考
多くのメタ関数は`prvalue`と`xvalue`を区別しないが、このメタ関数は区別する。例えば、右辺値参照に「戻り値の型が右辺値参照である関数」の戻り値を束縛することを考える。（再現コードは、説明の最後に付す）

この事自体は即座に不適格とはならない。しかし、その関数が実際には`prvalue`を返しているとすれば、その`prvalue`は戻り値の時点で右辺値参照に束縛されるため、それを右辺値参照に束縛したとしても寿命は延長されることはない。そのため、最終的にダングリング参照を生じることとなる。

このような場面においては、本メタ関数が`prvalue`と`xvalue`を、`prvalue`を`T`（参照なしの型）として、`xvalue`を`T&&`（右辺値参照である型、転送参照(Forwarding Reference) を意味しているわけではない）として区別すれば検出が可能となる。

```cpp example
#include <iostream>

struct S {
  S() { std::cout << "S construct" << std::endl; }
  ~S() { std::cout << "S destruct" << std::endl; }
};

S&& f() { return S{}; }

int main() {
  std::cout << "1" << std::endl;

  // f の戻り値は s に束縛されて寿命が延長されたか？
  // 実際にはこの宣言の1文が終了した際に f の戻り値は破棄されている
  S&& s = f();

  std::cout << "2" << std::endl;
}
```

### 出力
```
1
S construct
S destruct
2
```


## 例
```cpp example
#include <type_traits>

struct A {
	A() = default;
	A(int) {}
};

struct B : A {
	explicit B(int) {}
};

struct C {
	operator struct A() { return A{}; }
	explicit operator struct B() { return B{0}; }
};

int main()
{
	// OK: わかりやすく寿命が延長されるタイプ
	static_assert(std::reference_converts_from_temporary_v<int&&, int>);
	static_assert(std::reference_converts_from_temporary_v<const int&, int>);
	static_assert(std::reference_converts_from_temporary_v<A&&, B>);
	static_assert(std::reference_converts_from_temporary_v<const A&&, B>);

	// OK: 変換されて rvalue になってから束縛されて寿命が延長されるタイプ
	static_assert(std::reference_converts_from_temporary_v<int&&, long>);
	static_assert(std::reference_converts_from_temporary_v<int&&, long&>);
	static_assert(std::reference_converts_from_temporary_v<int&&, long&&>);

	// OK: explicit ではないので変換されて rvalue になってから束縛されて寿命が延長されるタイプ
	static_assert(std::reference_converts_from_temporary_v<A&&, C>);
	static_assert(std::reference_converts_from_temporary_v<A&&, C&>);
	static_assert(std::reference_converts_from_temporary_v<A&&, C&&>);
	static_assert(std::reference_converts_from_temporary_v<A&&, int>);


	// NG: const ではない左辺値参照は寿命を延長しないんですタイプ
	//     1つ目3つ目はそもそも参照そのものが構築出来ない
	static_assert(false == std::reference_converts_from_temporary_v<int&, int>);
	static_assert(false == std::reference_converts_from_temporary_v<int&, int&>);
	static_assert(false == std::reference_converts_from_temporary_v<int&, int&&>);

	// NG: 構築できないパターンと右辺値参照は区別するパターン
	static_assert(false == std::reference_converts_from_temporary_v<int&&, int&>);
	static_assert(false == std::reference_converts_from_temporary_v<int&&, int&&>);

	// NG: explicit なので変換出来ずに詰むパターン
	static_assert(false == std::reference_converts_from_temporary_v<B&&, C>);
	static_assert(false == std::reference_converts_from_temporary_v<B&&, C&>);
	static_assert(false == std::reference_converts_from_temporary_v<B&&, C&&>);
	static_assert(false == std::reference_converts_from_temporary_v<B&&, int>);
}

```
* std::reference_converts_from_temporary[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ???
- [GCC](/implementation.md#gcc): ???
- [ICC](/implementation.md#icc): ???
- [Visual C++](/implementation.md#visual_cpp): ???


## 関連項目
- [`reference_constructs_from_temporary`](reference_constructs_from_temporary.md)


## 参照
- [P2255R2 A type trait to detect reference binding to temporary](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2255r2.html)
