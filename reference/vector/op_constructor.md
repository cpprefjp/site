#コンストラクタ
```cpp
explicit vector(const Allocator& a = Allocator());														// C++11 まで
vector();																								// C++14 から
explicit vector(const Allocator& a);																	// C++14 から
explicit vector(size_type n, const T& value = T(), const Allocator& a = Allocator());					// C++03 まで
vector(size_type n, const T& value, const Allocator& a = Allocator());									// C++11 から
explicit vector(size_type n);																			// C++11
explicit vector(size_type n, const Allocator& a = Allocator());											// C++14 から
template <class InputIter> vector(InputIter first, InputIter last, const Allocator& a = Allocator());
vector(const vector& x);
vector(vector&& x);																						// C++11 から
vector(const vector& x, const Allocator& a);															// C++11 から
vector(vector&& x, const Allocator& a);																	// C++11 から
vector(initializer_list<T> il, const Allocator& a = Allocator());										// C++11 から
```
* initializer_list[link /reference/initializer_list.md]

##概要
`vector`オブジェクトを次に示す通りの要素で初期化する。

##効果

* `explicit vector(const Allocator& a = Allocator()); // C++11 まで`  
    デフォルトコンストラクタ。`size() == 0` の要素を持たない空の `vector` オブジェクトを構築する。（C++11 まで）
* `vector(); // C++14 から`  
    デフォルトコンストラクタ。`size() == 0` の要素を持たない空の `vector` オブジェクトを構築する。（C++14 から）
* `explicit vector(const Allocator& a); // C++14 から`  
    アロケータを別で受け取り、`size() == 0` の要素を持たない空の `vector` オブジェクトを構築する。（C++14 から）
* `explicit vector(size_type n, const T& value = T(), const Allocator& a = Allocator()); // C++03 まで`  
    繰り返しシーケンスコンストラクタ。アロケータ `a` を使用して、`value` のコピーを `n` 個要素として保持した `vector` オブジェクトを構築する。（C++03 まで）
* `vector(size_type n, const T& value, const Allocator& a = Allocator()); // C++11 から`  
    繰り返しシーケンスコンストラクタ。アロケータ `a` を使用して、`value` のコピーを `n` 個要素として保持した `vector` オブジェクトを構築する。（C++11 から）
* `explicit vector(size_type n); // C++11`  
    `n` 個の `T()` で初期化された要素を保持した `vector` オブジェクトを構築する。（C++11）
* `explicit vector(size_type n, const Allocator& a = Allocator()); // C++14 から`  
    アロケータ `a` を使用して、`n` 個の `T()` で初期化された要素を保持した `vector` オブジェクトを構築する。（C++14 から）
* `template <class InputIter> vector(InputIter first, InputIter last, const Allocator& a = Allocator());`  
    イテレータ範囲コンストラクタ。アロケータ `a` を使用して、`[first, last)` の範囲を要素としてコピーした `vector` オブジェクトを構築する。
* `vector(const vector& x);`  
    コピーコンストラクタ。`x` と同じ要素を保持した `vector` オブジェクトを構築する。
* `vector(vector&& x); // C++11 から`  
    ムーブコンストラクタ。`x` の指す先を自分の領域として `vector` オブジェクトを構築する。（C++11 から）
* `vector(const vector& x, const Allocator& a); // C++11 から`  
    アロケータを別で受け取り、`vector` オブジェクトをコピー構築する。（C++11 から）
* `vector(vector&& x, const Allocator& a); // C++11 から`  
    アロケータを別で受け取り、`vector` オブジェクトをムーブ構築する。（C++11 から）
* `vector(initializer_list<T> il, const Allocator& a = Allocator()); // C++11 から`  
    初期化子リストを受け取るコンストラクタ。`vector(il.`[`begin`](../initializer_list/begin.md)`(), li.`[`end`](../initializer_list/end.md)`(), a)` と等価。（C++11 から）

##パラメータ
* `n`  
    `value`の繰り返し個数。`size_type`メンバ型は符号なし整数。
* `value`  
    コンテナの要素として`n`個繰り返される値。`T`は1番目のテンプレートパラメータ(要素の型)。
* `first`, `last`  
    入力イテレータの組。`[first, last)`の範囲を全てコンテナの要素としてコピーする。
* `x`  
    コピー(ムーブ)元の同じテンプレートパラメータを持った`vector`オブジェクト。
* `a`  
    新しく生成する代わりに使用されるべき `Allocator` オブジェクト。標準の `std::`[`allocator`](../memory/allocator.md)を使う限り指定する意味は無い。


##計算量
デフォルトコンストラクタは定数時間。

繰り返しシーケンスコンストラクタは `n` に対して線形時間。

イテレータ範囲コンストラクタは [`distance`](../iterator/distance.md)`(first, last)` に対して線形時間。`InputIter` が前方向イテレータの要件を満たさない場合はあらかじめ要素数が分からないため、再確保のコストが(対数オーダで)別途発生する。

コピーコンストラクタは `x.`[`size`](size.md)`()` に対して線形時間。

ムーブコンストラクタは定数時間。ただし、アロケータ `a` を引数に取る場合、`a == x.`[`get_allocator`](get_allocator.md)`()` でなければ `x.`[`size`](size.md)`()` に対して線形時間。


##備考
- イテレータ範囲コンストラクタ `template <class InputIter> vector(InputIter first, InputIter last, const Allocator& a = Allocator())` は、C++03 までは `InputIter` が整数型の場合には `vector(static_cast<typename vector::size_type>(first), static_cast<typename vector::value_type>(last), a)` と同等とされていたが、C++11 では `InputIter` が入力イテレータの要件を満たさなければオーバーロード解決に参加しないように変更された。
- C++11 では、`explicit vector(size_type n, const T& value = T(), const Allocator& a = Allocator())` の引数 `value` に関するデフォルト引数が削除され、新たなコンストラクタ `explicit vector(size_type n)` が追加された。  
	これは、デフォルト引数を使用すると、引数 `value` のデフォルト初期化 1 回＋`vector` の要素へのコピー初期化 `n` 回のコンストラクタ呼び出しが必要となるが、デフォルト引数でなければ `vector` の要素へのデフォルト初期化 `n` 回のコンストラクタ呼び出しで済むためである。

- C++14 では、`explicit vector(const Allocator& a = Allocator())` がデフォルト引数を使用しない 2 つのオーバーロードに分割された。  
	これは、デフォルトコンストラクタに `explicit` が付いていると、

	```cpp
std::vector<int> v = {};
```

	のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。

- C++14 では、`explicit vector(size_type n)` に引数が追加され、`explicit vector(size_type n, const Allocator& a = Allocator())` に変更された。  
	これは、変更されないと `n` のみを引数にとるアロケータ使用構築（uses-allocator construction）に失敗してしまうためである。
	具体的には、C++11 では以下のようなコードがエラーになってしまう。

	```cpp
#include <list>
#include <vector>
#include <scoped_allocator>

int main()
{
	using vi = std::vector<int>;
	std::list<vi, std::scoped_allocator_adaptor<std::allocator<vi>>> l;
	l.emplace_back(10u);
}
```
* list[link ../list.md]
* vector[link ../vector.md]
* scoped_allocator[link ../scoped_allocator.md]
* scoped_allocator_adaptor[link ../scoped_allocator/scoped_allocator_adaptor.md]
* allocator[link ../memory/allocator.md]
* emplace_back[link ../list/emplace_back.md]


##例
```cpp
#include <vector>

#include <iostream>
#include <string>
#include <algorithm> // std::for_each

template <class T>
void print(const std::string& name, const std::vector<T>& v)
{
  std::cout << name << " : {";
  std::for_each(std::begin(v), std::end(v), [](const T& x) { std::cout << x << " "; });
  std::cout << "}" << std::endl;
}

int main ()
{
  std::vector<int> first;                               			// int型の空のvectorを構築
  std::vector<int> second(4, 100);                      			// 4個のint値からなるvectorを構築し、全ての値を100で初期化
  std::vector<int> third(std::begin(second), std::end(second));		// secondのイテレータ範囲からvectorを構築
  std::vector<int> fourth(third);                       			// thirdをコピー

  // 組み込み配列からvectorを構築
  int myints[] = {16,2,77,29};
  std::vector<int> fifth(myints, myints + sizeof(myints) / sizeof(int));
  // fifth(std::begin(myints), std::end(myints)); でもOK

  // 初期化子リストからvectorを構築
  std::vector<int> sixth = {1, 2, 3};

  print("first", first);
  print("second", second);
  print("third", third);
  print("fourth", fourth);
  print("fifth", fifth);
  print("sixth", sixth);
}
```
* vector[link ../vector.md]
* iostream[link ../iostream.md]
* string[link ../string.md]
* algorithm[link ../algorithm.md]
* cout[link ../iostream/cout.md]
* for_each[link ../algorithm/for_each.md]
* endl[link ../ostream/endl.md]
* begin[link ../iterator/begin.md]
* end[link ../iterator/end.md]

###出力
```
first : {}
second : {100 100 100 100 }
third : {100 100 100 100 }
fourth : {100 100 100 100 }
fifth : {16 2 77 29 }
sixth : {1 2 3 }
```


##参照
* [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
	`explicit vector(const Allocator& a = Allocator())` を 2 つのオーバーロードに分割するきっかけとなったレポート
* [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
	`explicit vector(size_type n)` にアロケータ引数を追加するきっかけとなったレポート  
	なお、Discussion の例はアロケータの型が誤っているので注意
