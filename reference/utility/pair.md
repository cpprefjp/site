# pair
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T1, class T2>
  struct pair;
}
```

## 概要
`pair`は、2つの異なる型の値を保持する「組」を表現するためのクラスである。また、N個の異なる型の値を保持する「タプル」を表現するためのクラスとして、[`tuple`](/reference/tuple/tuple.md)クラスも提供されている。

標準ライブラリにおいて`pair`は、連想配列コンテナの実装である[`map`](/reference/map/map.md)クラスや[`unordered_map`](/reference/unordered_map/unordered_map.md)クラスで、キーと値をまとめるためのデータ型として使用されている。

- C++20 : `T1`と`T2`がどちらも構造的型である場合、この型は構造的型となる


## メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`first`](pair/first.md)  | 1つめの要素 | |
| [`second`](pair/second.md) | 2つめの要素 | |


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------|-------|
| [`(constructor)`](pair/op_constructor.md) | コンストラクタ | |
| [`operator=`](pair/op_assign.md)          | 代入演算子 | |
| [`swap`](pair/swap.md)                    | 他の`pair`オブジェクトと値を入れ替える | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|---------------|------|-------|
| `first_type`  | `T1` | |
| `second_type` | `T2` | |


## 非メンバ関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|----------------------------|-------|
| [`operator==`](pair/op_equal.md)         | 等値比較を行う | |
| [`operator!=`](pair/op_not_equal.md)     | 非等値比較を行う | |
| [`operator<=>`](pair/op_compare_3way.md) | 三方比較を行う | C++20 |
| [`operator<`](pair/op_less.md)           | 左辺が右辺よりも小さいか判定を行う | |
| [`operator<=`](pair/op_less_equal.md)    | 左辺が右辺以下か判定を行う | |
| [`operator>`](pair/op_greater.md)        | 左辺が右辺より大きいか判定を行う | |
| [`operator>=`](pair/op_greater_equal.md) | 左辺が右辺以上か判定を行う | |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|-------------------------------|-------------------------------------|-------|
| [`swap`](pair/swap_free.md) | 2つの`pair`オブジェクトを入れ替える | C++11 |


### ヘルパ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------|----------------------------|-------|
| [`make_pair`](make_pair.md) | `pair`を構築するヘルパ関数 | |


## タプルインタフェース

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`tuple_size`](pair/tuple_size.md)       | `pair`の要素数を取得する(class template)           | C++11 |
| [`tuple_element`](pair/tuple_element.md) | `pair`の`i`番目の要素型を取得する(class template)  | C++11 |
| [`get`](pair/get.md)                     | `pair`の`i`番目の要素を参照する(function template) | C++11 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](pair/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 特殊化

| 名前                                                       | 説明                                                     | 対応バージョン |
|------------------------------------------------------------|--------------------------------------------------------|-----------|
| [`common_type`](pair/common_type.md)                       | 異なる`pair`間の共通型を取得できるようにする特殊化        | C++23     |
| [`basic_common_reference`](pair/basic_common_reference.md) | 異なる`pair`間の共通の参照型を取得出来るようにする特殊化 | C++23     |


## 例
### 基本的な使い方 (C++03)
```cpp example
#include <iostream>
#include <utility>
#include <string>

int main()
{
  // pairオブジェクトの構築
  std::pair<int, std::string> p = std::make_pair(1, "hello");

  // 要素の参照
  std::cout << p.first << std::endl;
  std::cout << p.second << std::endl;
}
```
* std::pair[color ff0000]

#### 出力
```
1
hello
```


### 基本的な使い方 (C++17)
```cpp example
#include <iostream>
#include <utility>
#include <string>

// 関数から2つの値を返す
std::pair<int, std::string> f()
{
  // std::make_pair()はほとんどの状況で必要ない
  return {1, "hello"};
}

int main()
{
  // 構造化束縛でペアを分解して、それぞれの要素を代入
  auto [a, b] = f();

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```

#### 出力
```
1
hello
```


### プロキシ参照としての使い方（C++23）
C++23 で[`zip_view`](/reference/ranges/zip_view.md)などが追加されたことに伴い、どちらの要素も[プロキシ参照](/reference/iterator/indirectly_writable.md)であるような`pair`は[プロキシ参照](/reference/iterator/indirectly_writable.md)として使用することが出来るようになった。

```cpp example
#include <iostream>
#include <utility>
#include <string_view>
#include <format>

struct A
{
	A(int i, double d)
		: i(i)
		, d(d)
	{}

	std::pair<int&, double&> f()
	{
		// this が A* なので
		// i: int
		// d: double
		// ということと同じ
		return {i, d};
	}

	std::pair<const int&, const double&> f() const
	{
		// this が const A* なので
		// i: const int
		// d: const double
		// ということと同じ
		return {i, d};
	}

private:
	int    i;
	double d;
};

int main()
{
	// プロキシ参照である pair の性質
	{
		A a{0, 0.0};

		// std::pair<int&, double&>
		/***/ auto /***/ proxy = a.f();

		// const std::pair<int&, double&>
		const auto const_proxy = a.f();

		// std::pair<const int&, const double&>
		/***/ auto /***/ proxy_to_const = std::as_const(a).f();

		// const std::pair<const int&, const double&>
		const auto const_proxy_to_const = std::as_const(a).f();

		// OK（各要素が指すオブジェクトの値について、代入操作がなされる）
		proxy       = a.f();
		const_proxy = a.f();

		// NG（各要素が指すオブジェクトを変更できない！）
		// proxy_to_const       = a.f();
		// const_proxy_to_const = a.f();
	}

	// 使い方
	{
		auto print = [](std::string_view prefix, A& a) {

			// 構造化束縛で分解
			// i: int&
			// d: double&
			auto [i, d] = a.f();

			std::cout << std::format("{}: i={}, d={}\n", prefix, i, d);
		};

		A a{0, 0.0}, b{1, 1.0};

		print("before a", a);
		print("before b", b);

		// プロキシ参照として使える pair 同士の swap 操作で
		// 問題なく各要素が指す先のオブジェクトについて swap 操作が行える
		std::ranges::swap(a.f(), b.f());

		print("after  a", a);
		print("after  b", b);
	}
}
```

#### 出力
```
before a: i=0, d=0
before b: i=1, d=1
after  a: i=1, d=1
after  b: i=0, d=0
```


## 関連項目
- [`std::tuple`](/reference/tuple/tuple.md)
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)


## 参照
- [タプル - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%97%E3%83%AB)
- [P2321R2 zip](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2321r2.html)
