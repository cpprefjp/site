#コンストラクタ (C++11)
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]

```cpp
explicit forward_list(const Allocator& a = Allocator());									// C++11 のみ
forward_list();																				// C++14 から
explicit forward_list(const Allocator& a);													// C++14 から
forward_list(size_type n, const T& value, const Allocator& a = Allocator());
explicit forward_list(size_type n);															// C++11 のみ
explicit forward_list(size_type n, const Allocator& a = Allocator());						// C++14 から
template <class InputIterator>
forward_list(InputIterator first, InputIterator last, const Allocator& a = Allocator());
forward_list(const forward_list& x);
forward_list(forward_list&& x);
forward_list(const forward_list& x, const Allocator& a);
forward_list(forward_list&& x, const Allocator& a);
forward_list(initializer_list<T> il, const Allocator& a = Allocator());
```
* initializer_list[link /reference/initializer_list.md]

##forward_listオブジェクトの構築
- `explicit forward_list(const Allocator& a = Allocator()); // C++11 のみ`  
	デフォルトコンストラクタ。アロケータを指定して空のコンテナを作る。  
	計算量：定数時間
- `forward_list(); // C++14 から`  
	デフォルトコンストラクタ。空のコンテナを作る。  
	計算量：定数時間
- `forward_list(const Allocator& a); // C++14 から`  
	アロケータを指定して空のコンテナを作る。  
	計算量：定数時間
- `forward_list(size_type n, const T& value, const Allocator& a = Allocator());`  
	`value` のコピーを `n` 個要素として保持した `forward_list` オブジェクトを構築する。  
	計算量：`n` に対して線形時間
- `explicit forward_list(size_type n); // C++11 のみ`  
	`n` 個の `T()` で初期化された要素を保持した `forward_list` オブジェクトを構築する。  
	計算量：`n` に対して線形時間
- `explicit forward_list(size_type n, const Allocator& a = Allocator()); // C++14 から`  
	アロケータを指定して `n` 個の `T()` で初期化された要素を保持した `forward_list` オブジェクトを構築する。  
	計算量：`n` に対して線形時間
- `template <class InputIterator>`  
	`forward_list(InputIterator first, InputIterator last, const Allocator& a = Allocator());`  
	`[first, last)` の範囲を要素としてコピーした `forward_list` オブジェクトを構築する。  
	計算量：[`distance`](/reference/iterator/distance.md)`(first, last)`に対して線形時間
- `forward_list(const forward_list& x);`  
	コピーコンストラクタ。`x` と同じ要素を保持した `forward_list` オブジェクトを構築する。  
	計算量：`x` の要素数に対して線形時間
- `forward_list(forward_list&& x);`  
	ムーブコンストラクタ。`x` の指す先を自分の領域として `forward_list` オブジェクトを構築する。  
	計算量：定数時間
- `forward_list(const forward_list& x, const Allocator& a);`  
	アロケータを指定したコピーコンストラクタ  
	計算量：`x` の要素数に対して線形時間
- `forward_list(forward_list&& x, const Allocator& a);`  
	アロケータを指定したムーブコンストラクタ  
	計算量：`x.`[`get_allocator`](get_allocator.md)`() == a` であれば、定数時間。そうでなければ `x` の要素数に対して線形時間
- `forward_list(`[`initializer_list`](/reference/initializer_list.md)`<T> il, const Allocator& a = Allocator());`  
	初期化子リストを受け取るコンストラクタ。`forward_list(il.`[`begin`](../initializer_list/begin.md)`(), il.`[`end`](../initializer_list/end.md)`(), a)` と同等。


##備考
- イテレータ範囲コンストラクタ `template <class InputIterator> forward_list(InputIterator first, InputIterator last, const Allocator& a = Allocator())` は、`InputIterator` が入力イテレータの要件を満たさなければオーバーロード解決に参加しない。
- C++14 では、`explicit forward_list(const Allocator& a = Allocator())` がデフォルト引数を使用しない 2 つのオーバーロードに分割された。  
	これは、デフォルトコンストラクタに `explicit` が付いていると、

	```cpp
std::forward_list<int> fl = {};
```

	のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。

- C++14 では、`explicit forward_list(size_type n)` に引数が追加され、`explicit forward_list(size_type n, const Allocator& a = Allocator())` に変更された。  
	これは、変更されないと `n` のみを引数にとるアロケータ使用構築（uses-allocator construction）に失敗してしまうためである。
	具体的には、C++11 では以下のようなコードがエラーになってしまう。

	```cpp
#include <list>
#include <forward_list>
#include <scoped_allocator>

int main()
{
  using fli = std::forward_list<int>;
  std::list<fli, std::scoped_allocator_adaptor<std::allocator<fli>>> l;
  l.emplace_back(10u);
}
```
* list[link ../list.md]
* forward_list[link ../forward_list.md]
* scoped_allocator[link ../scoped_allocator.md]
* scoped_allocator_adaptor[link ../scoped_allocator/scoped_allocator_adaptor.md]
* allocator[link ../memory/allocator.md]
* emplace_back[link ../list/emplace_back.md]


##例
```cpp
#include <iostream>
#include <forward_list>
#include <utility> // move

template <class T>
void print(const char* name, const std::forward_list<T>& ls)
{
  std::cout << name << " : ";
  for (const T& x : ls) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}

int main()
{
  // デフォルト構築
  std::forward_list<int> ls1;
  print("ls1", ls1);

  // n個の要素を持つリストを作成
  std::forward_list<int> ls2(3);
  print("ls2", ls2);

  // n個の指定された値を要素を持つリストを作成
  std::forward_list<int> ls3(3, 1);
  print("ls3", ls3);

  // 範囲から構築
  std::forward_list<int> ls4(ls3.begin(), ls3.end());
  print("ls4", ls4);

  // コピー構築
  std::forward_list<int> ls5 = ls4;
  print("ls5", ls5);

  // ムーブ構築
  std::forward_list<int> ls6 = std::move(ls5);
  print("ls6", ls6);

  // 初期化子リストで構築
  std::forward_list<int> ls7 = {1, 2, 3};
  print("ls7", ls7);
}
```
* iostream[link ../iostream.md]
* forward_list[link ../forward_list.md]
* utility[link ../utility.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]
* begin[link begin.md]
* end[link end.md]
* move[link ../utility/move.md]

###出力
```
ls1 : 
ls2 : 0 0 0 
ls3 : 1 1 1 
ls4 : 1 1 1 
ls5 : 1 1 1 
ls6 : 1 1 1 
ls7 : 1 2 3 
```

##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
* [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
	`explicit forward_list(const Allocator& a = Allocator())` を 2 つのオーバーロードに分割するきっかけとなったレポート
* [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
	`explicit forward_list(size_type n)` にアロケータ引数を追加するきっかけとなったレポート  
	なお、Discussion の例はアロケータの型が誤っているので注意
