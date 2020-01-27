# コンストラクタ
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
vector();                                            // (1) C++14
vector() noexcept(noexcept(Allocator()))             // (1) C++17
  : vector(Allocator()) {}

explicit vector(const Allocator& a);                 // (2) C++14
explicit vector(const Allocator&) noexcept;          // (2) C++17

explicit vector(const Allocator& a = Allocator());   // (1) + (2) C++03

explicit vector(size_type n);                        // (3) C++11
explicit vector(size_type n,
                const Allocator& a = Allocator());   // (3) C++14

vector(size_type n, const T& value,
       const Allocator& a = Allocator());            // (4) C++11

explicit vector(size_type n, const T& value = T(),
                const Allocator& a = Allocator());   // (3) + (4) C++03

template <class InputIter>
vector(InputIter first, InputIter last,
      const Allocator& a = Allocator());             // (5) C++03

vector(const vector& x);                             // (6) C++03

vector(vector&& x);                                  // (7) C++11
vector(vector&& x); noexcept                         // (7) C++17

vector(const vector& x, const Allocator& a);         // (8) C++11

vector(vector&& x, const Allocator& a);              // (9) C++11

vector(initializer_list<T> il,
       const Allocator& a = Allocator());            // (10) C++11
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
`vector`オブジェクトを次に示す通りの要素で初期化する。


## 効果

- (1) : デフォルトコンストラクタ。`size() == 0` の要素を持たない空の `vector` オブジェクトを構築する。
- (2) : ア�ケータを別で受け取り、`size() == 0` の要素を持たない空の `vector` オブジェクトを構築する。
- (1) + (2) : デフォルトコンストラクタ。`size() == 0` の要素を持たない空の `vector` オブジェクトを構築する。
- (3) :
	- C++11 : `n` 個の `T()` で初期化された要素を保持した `vector` オブジェクトを構築する。
	- C++14 : ア�ケータ `a` を使用して、`n` 個の `T()` で初期化された要素を保持した `vector` オブジェクトを構築する。
- (4) : 繰り返しシーケンスコンストラクタ。ア�ケータ `a` を使用して、`value` のコピーを `n` 個要素として保持した `vector` オブジェクトを構築する。
- (3) + (4) : 繰り返しシーケンスコンストラクタ。ア�ケータ `a` を使用して、`value` のコピーを `n` 個要素として保持した `vector` オブジェクトを構築する。
- (5) : イテレータ範囲コンストラクタ。ア�ケータ `a` を使用して、`[first, last)` の範囲を要素としてコピーした `vector` オブジェクトを構築する。
- (6) : コピーコンストラクタ。`x` と同じ要素を保持した `vector` オブジェクトを構築する。
- (7) : ムーブコンストラクタ。`x` の指す先を自分の領域として `vector` オブジェクトを構築する。
- (8) : ア�ケータを別で受け取り、`vector` オブジェクトをコピー構築する。
- (9) : ア�ケータを別で受け取り、`vector` オブジェクトをムーブ構築する。
- (10) : 初期化�リストを受け取るコンストラクタ。`vector(il.`[`begin`](/reference/initializer_list/initializer_list/begin.md)`(), li.`[`end`](/reference/initializer_list/initializer_list/end.md)`(), a)` と�価。


## 計算量
- (1), (2) : 定数時間
- (3), (4) : `n` に対して線形時間
- (5) : [`distance`](/reference/iterator/distance.md)`(first, last)` に対して線形時間。`InputIter` が前方向イテレータの要件を満たさない場合はあらかじめ要素数が分からないため、再確保のコストが(対数オーダで)別途発生する。
- (6) : `x.`[`size`](size.md)`()` に対して線形時間
- (7) : 定数時間
- (8) : `x.`[`size`](size.md)`()` に対して線形時間
- (9) : 定数時間。ただし、`a == x.`[`get_allocator`](get_allocator.md)`()` でなければ `x.`[`size`](size.md)`()` に対して線形時間。
- (10) : `il.`[`size`](/reference/initializer_list/initializer_list/size.md)`()` に対して線形時間


## 備考
- イテレータ範囲コンストラクタ(5) `template <class InputIter> vector(InputIter first, InputIter last, const Allocator& a = Allocator())` は、C++03 までは `InputIter` が整数型の場合には `vector(static_cast<typename vector::size_type>(first), static_cast<typename vector::value_type>(last), a)` と�価とされていたが、C++11 では `InputIter` が入力イテレータの要件を満たさなければオーバー�ード解決に参加しないように変更された。
- C++11 では、`explicit vector(size_type n, const T& value = T(), const Allocator& a = Allocator())` の引数 `value` に関するデフォルト引数が削除され、新たなコンストラクタ `explicit vector(size_type n)` が追加された。  
	これは、デフォルト引数を使用すると、引数 `value` のデフォルト初期化 1 回＋`vector` の要素へのコピー初期化 `n` 回のコンストラクタ呼び出しが必要となるが、デフォルト引数でなければ `vector` の要素へのデフォルト初期化 `n` 回のコンストラクタ呼び出しで済むためである。

- C++14 では、`explicit vector(const Allocator& a = Allocator())` がデフォルト引数を使用しない 2 つのオーバー�ードに分割された。  
	これは、デフォルトコンストラクタに `explicit` が付いていると、

    ```cpp
    std::vector<int> v = {};
    ```

	のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。

- C++14 では、`explicit vector(size_type n)` に引数が追加され、`explicit vector(size_type n, const Allocator& a = Allocator())` に変更された。  
	これは、変更されないと `n` のみを引数にとるア�ケータ使用構築（uses-allocator construction）に失敗してしまうためである。
	具体的には、C++11 では以下のようなコードがエラーになってしまう。

    ```cpp example
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
    * std::scoped_allocator_adaptor[link /reference/scoped_allocator/scoped_allocator_adaptor.md]
    * std::allocator[link /reference/memory/allocator.md]
    * emplace_back[link /reference/list/list/emplace_back.md]


## 例
```cpp example
#include <vector>
#include <iostream>
#include <string>
#include <algorithm>

template <class T>
void print(const std::string& name, const std::vector<T>& v)
{
  std::cout << name << " : {";
  std::for_each(std::begin(v), std::end(v), [](const T& x) { std::cout << x << " "; });
  std::cout << "}" << std::endl;
}

int main()
{
  std::vector<int> first;                                           // int型の空のvectorを構築
  std::vector<int> second(4, 100);                                  // 4個のint値からなるvectorを構築し、全ての値を100で初期化
  std::vector<int> third(std::begin(second), std::end(second));     // secondのイテレータ範囲からvectorを構築
  std::vector<int> fourth(third);                                  // thirdをコピー

  // 組み込み配列からvectorを構築
  int myints[] = {16,2,77,29};
  std::vector<int> fifth(myints, myints + sizeof(myints) / sizeof(int));
  // fifth(std::begin(myints), std::end(myints)); でもOK

  // 初期化�リストからvectorを構築
  std::vector<int> sixth = {1, 2, 3};

  print("first", first);
  print("second", second);
  print("third", third);
  print("fourth", fourth);
  print("fifth", fifth);
  print("sixth", sixth);
}
```

### 出力
```
first : {}
second : {100 100 100 100 }
third : {100 100 100 100 }
fourth : {100 100 100 100 }
fifth : {16 2 77 29 }
sixth : {1 2 3 }
```


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (10)の経緯となる提案文書
- [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
	`explicit vector(const Allocator& a = Allocator())` を 2 つのオーバー�ードに分割するきっかけとなったレポート
- [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
	`explicit vector(size_type n)` にア�ケータ引数を追加するきっかけとなったレポート  
	なお、Discussion の例はア�ケータの型が誤っているので注意
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
