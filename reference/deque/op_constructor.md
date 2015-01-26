#コンストラクタ
```cpp
explicit deque(const Allocator& a = Allocator());                                       // C++11 まで

deque();                                                                                // C++14 から

explicit deque(const Allocator& a);                                                     // C++14 から

deque(size_type n, const T& value = T(), const Allocator& a = Allocator());             // C++03 まで

deque(size_type n, const T& value, const Allocator& a = Allocator());                   // C++11 から

explicit deque(size_type n);                                                            // C++11

explicit deque(size_type n, const Allocator& a = Allocator());                          // C++14 から

template <class InputIterator>
deque(InputIterator first, InputIterator last, const Allocator& a = Allocator());

deque(const deque& x);

deque(deque&& y);                                                                       // C++11 から

deque(const deque& x, const Allocator& a);                                              // C++11 から

deque(deque&& y, const Allocator& a);                                                   // C++11 から

deque(initializer_list<T> il, const Allocator& a = Allocator());                        // C++11 から
```
* initializer_list[link /reference/initializer_list.md]


##概要
`deque` オブジェクトの構築


##効果
`deque` コンテナオブジェクトを構築し、コンストラクタの種類に応じて要素を初期化する。

- `explicit deque(const Allocator& a = Allocator()); // C++11 まで`  
	デフォルトコンストラクタ。アロケータに `a` を使用して、サイズがゼロで要素を持たない空の `deque` を構築する。  
	計算量： 定数時間
- `deque(); // C++14 から`  
	デフォルトコンストラクタ。サイズがゼロで要素を持たない空の `deque` を構築する。  
	計算量： 定数時間
- `explicit deque(const Allocator& a); // C++14 から`  
	アロケータに `a` を使用して、サイズがゼロで要素を持たない空の `deque` を構築する。  
	計算量： 定数時間
- `deque(size_type n, const T& value = T(), const Allocator& a = Allocator()); // C++03 まで`  
	繰り返しシーケンスコンストラクタ。アロケータに `a` を使用して、`value` のコピーを `n` 個要素として保持した `deque` を構築する。  
	計算量： `n`に対して線形時間
- `deque(size_type n, const T& value, const Allocator& a = Allocator()); // C++11 から`  
	繰り返しシーケンスコンストラクタ。アロケータに `a` を使用して、`value` のコピーを `n` 個要素として保持した `deque` を構築する。  
	計算量： `n` に対して線形時間
- `deque(size_type n); // C++11`  
	繰り返しシーケンスコンストラクタ。値初期化されたオブジェクトを `n` 個要素として保持した `deque` を構築する。  
	計算量： `n` に対して線形時間
- `deque(size_type n, const Allocator& a = Allocator()); // C++14 から`  
	繰り返しシーケンスコンストラクタ。アロケータに `a` を使用して、値初期化されたオブジェクトを `n` 個要素として保持した `deque` を構築する。  
	計算量： `n` に対して線形時間
- `template <class InputIterator>`  
	`deque(InputIterator first, InputIterator last, const Allocator& a = Allocator());`  
	イテレータ範囲コンストラクタ。アロケータに `a` を使用して、`[first, last)` の範囲を要素としてコピーした `deque` を構築する。  
	計算量： `first` から `last` への距離に対して線形時間
- `deque(const deque& x);`  
	コピーコンストラクタ。`x` と同じ要素を保持した `deque` を構築する。  
	計算量： `x` の要素数に対して線形時間
- `deque(deque&& y); // C++11 から`  
	ムーブコンストラクタ。ムーブセマンティクスを使って `y` の要素でコンテナを構築する。  
	計算量： 定数時間
- `deque(const deque& x, const Allocator& a); // C++11 から`  
	コピーコンストラクタ。アロケータに `a` を使用して、`x` と同じ要素を保持した `deque` を構築する。  
	計算量： `x` の要素数に対して線形時間
- `deque(deque&& y, const Allocator& a); // C++11 から`  
	ムーブコンストラクタ。アロケータに `a` を使用して、ムーブセマンティクスを使って `y` の要素でコンテナを構築する。  
	計算量： `a == y.`[`get_allocator`](get_allocator.md)`()` の場合、定数時間、そうでなければ `y` の要素数に対して線形時間
- `deque(`[`initializer_list`](/reference/initializer_list.md)`<T> il, const Allocator& a = Allocator()); // C++11 から`  
	初期化子リストで要素を構築するコンストラクタ。`deque(il.`[`begin`](../initializer_list/begin.md)`(), il.`[`end`](../initializer_list/end.md)`(), a)` と同等。


##備考
- イテレータ範囲コンストラクタ `template <class InputIter> deque(InputIter first, InputIter last, const Allocator& a = Allocator())` は、C++03 までは `InputIter` が整数型の場合には `deque(static_cast<typename deque::size_type>(first), static_cast<typename deque::value_type>(last), a)` と同等とされていたが、C++11 では `InputIter` が入力イテレータの要件を満たさなければオーバーロード解決に参加しないように変更された。
- C++11 では、`explicit deque(size_type n, const T& value = T(), const Allocator& a = Allocator())` の引数 `value` に関するデフォルト引数が削除され、新たなコンストラクタ `explicit deque(size_type n)` が追加された。  
	これは、デフォルト引数を使用すると、引数 `value` のデフォルト初期化 1 回＋`deque` の要素へのコピー初期化 `n` 回のコンストラクタ呼び出しが必要となるが、デフォルト引数でなければ `deque` の要素へのデフォルト初期化 `n` 回のコンストラクタ呼び出しで済むためである。

- C++14 では、`explicit deque(const Allocator& a = Allocator())` がデフォルト引数を使用しない 2 つのオーバーロードに分割された。  
	これは、デフォルトコンストラクタに `explicit` が付いていると、

	```cpp
std::deque<int> d = {};
```

	のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。

- C++14 では、`explicit deque(size_type n)` に引数が追加され、`explicit deque(size_type n, const Allocator& a = Allocator())` に変更された。  
	これは、変更されないと `n` のみを引数にとるアロケータ使用構築（uses-allocator construction）に失敗してしまうためである。
	具体的には、C++11 では以下のようなコードがエラーになってしまう。

	```cpp
#include <list>
#include <deque>
#include <scoped_allocator>

int main()
{
  using di = std::deque<int>;
  std::list<di, std::scoped_allocator_adaptor<std::allocator<di>>> l;
  l.emplace_back(10u);
}
```
* list[link ../list.md]
* deque[link ../deque.md]
* scoped_allocator[link ../scoped_allocator.md]
* scoped_allocator_adaptor[link ../scoped_allocator/scoped_allocator_adaptor.md]
* allocator[link ../memory/allocator.md]
* emplace_back[link emplace_back.md]


##例
```cpp
#include <iostream>
#include <deque>
#include <utility>

template <class T>
void print(const char* name, const std::deque<T>& c)
{
  std::cout << name << " : {";
  for (const T& x : c) {
    std::cout << x << " ";
  }
  std::cout << "}" << std::endl;
}

int main ()
{
  // デフォルトコンストラクタ
  std::deque<int> c1;

  // 3個の要素を持つコンテナを構築
  std::deque<int> c2(3);

  // 値1の要素を3個持つコンテナを構築
  std::deque<int> c3(3, 1);

  // イテレータの範囲による構築
  std::deque<int> c40 = {1, 2, 3}; // 構築用の一時オブジェクト(説明用)
  std::deque<int> c4(c40.begin(), c40.end());

  // コピー構築
  std::deque<int> c5(c4);

  // ムーブ構築
  std::deque<int> c60 = {1, 2, 3}; // 構築用の一時オブジェクト(説明用)
  std::deque<int> c6(std::move(c60));

  // 初期化子リストによる構築
  std::deque<int> c7 = {1, 2, 3};

  print("c1", c1);
  print("c2", c2);
  print("c3", c3);
  print("c4", c4);
  print("c5", c5);
  print("c6", c6);
  print("c7", c7);
}
```
* iostream[link ../iostream.md]
* deque[link ../deque.md]
* utility[link ../utility.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]
* begin[link begin.md]
* end[link end.md]
* move[link ../utility/move.md]

###出力
```
c1 : {}
c2 : {0 0 0 }
c3 : {1 1 1 }
c4 : {1 2 3 }
c5 : {1 2 3 }
c6 : {1 2 3 }
c7 : {1 2 3 }
```

##参照
* [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
	`explicit deque(const Allocator& a = Allocator())` を 2 つのオーバーロードに分割するきっかけとなったレポート
* [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
	`explicit deque(size_type n)` にアロケータ引数を追加するきっかけとなったレポート  
	なお、Discussion の例はアロケータの型が誤っているので注意
