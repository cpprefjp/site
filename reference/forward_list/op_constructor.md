# コンストラクタ
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
forward_list();                                          // (1) C++14
explicit forward_list(const Allocator& a);               // (2) C++14

explicit forward_list(const Allocator& a = Allocator()); // (1) + (2) C++11

forward_list(size_type n,
             const T& value,
             const Allocator& a = Allocator());          // (3) C++11

explicit forward_list(size_type n);                      // (4) C++11
explicit forward_list(size_type n,
                      const Allocator& a = Allocator()); // (4) C++14

template <class InputIterator>
forward_list(InputIterator first,
             InputIterator last,
             const Allocator& a = Allocator());          // (5) C++11

forward_list(const forward_list& x);                     // (6) C++11
forward_list(forward_list&& x);                          // (7) C++11

forward_list(const forward_list& x, const Allocator& a); // (8) C++11
forward_list(forward_list&& x, const Allocator& a);      // (9) C++11

forward_list(initializer_list<T> il,
             const Allocator& a = Allocator());          // (10) C++11
```
* initializer_list[link /reference/initializer_list.md]

## 概要
`forward_list`オブジェクトを、以下に示す通りの要素で初期化する。


## 効果
- (1) : デフォルトコンストラクタ。空のコンテナを作る。
- (2) : アロケータを指定して空のコンテナを作る。
- (1) + (2) : デフォルトコンストラクタ。アロケータを指定して空のコンテナを作る。
- (3) : `value` のコピーを `n` 個要素として保持した `forward_list` オブジェクトを構築する。
- (4)
    - C++11 : `n` 個の `T()` で初期化された要素を保持した `forward_list` オブジェクトを構築する。
    - C++14 : アロケータを指定して `n` 個の `T()` で初期化された要素を保持した `forward_list` オブジェクトを構築する。
- (5) : `[first, last)` の範囲を要素としてコピーした `forward_list` オブジェクトを構築する。
- (6) : コピーコンストラクタ。`x` と同じ要素を保持した `forward_list` オブジェクトを構築する。
- (7) : ムーブコンストラクタ。`x` の指す先を自分の領域として `forward_list` オブジェクトを構築する。
- (8) : アロケータを指定したコピーコンストラクタ  
- (9) : アロケータを指定したムーブコンストラクタ  
- (10) : 初期化子リストを受け取るコンストラクタ。`forward_list(il.`[`begin`](../initializer_list/begin.md)`(), il.`[`end`](../initializer_list/end.md)`(), a)` と同等。


## 計算量
- (1), (2) : 定数時間
- (3) : `n` に対して線形時間
- (4) : `n` に対して線形時間
- (5) : [`distance`](/reference/iterator/distance.md)`(first, last)`に対して線形時間
- (6) : `x` の要素数に対して線形時間
- (7) : 定数時間
- (8) : `x` の要素数に対して線形時間
- (9) : `x.`[`get_allocator`](get_allocator.md)`() == a` であれば、定数時間。そうでなければ `x` の要素数に対して線形時間
- (10) : `il` の要素数に対して線形時間


## 備考
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

    ```cpp example
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
    * std::scoped_allocator_adaptor[link ../scoped_allocator/scoped_allocator_adaptor.md]
    * std::allocator[link ../memory/allocator.md]
    * emplace_back[link ../list/emplace_back.md]


## 例
```cpp example
#include <iostream>
#include <forward_list>
#include <utility>

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
  // (1) デフォルト構築
  std::forward_list<int> ls1;
  print("ls1", ls1);

  // (4) n個の要素を持つリストを作成
  std::forward_list<int> ls2(3);
  print("ls2", ls2);

  // (3) n個の指定された値を要素を持つリストを作成
  std::forward_list<int> ls3(3, 1);
  print("ls3", ls3);

  // (5) 範囲から構築
  std::forward_list<int> ls4(ls3.begin(), ls3.end());
  print("ls4", ls4);

  // (6) コピー構築
  std::forward_list<int> ls5 = ls4;
  print("ls5", ls5);

  // (7) ムーブ構築
  std::forward_list<int> ls6 = std::move(ls5);
  print("ls6", ls6);

  // (10) 初期化子リストで構築
  std::forward_list<int> ls7 = {1, 2, 3};
  print("ls7", ls7);
}
```
* begin[link begin.md]
* end[link end.md]
* std::move[link ../utility/move.md]

### 出力
```
ls1 : 
ls2 : 0 0 0 
ls3 : 1 1 1 
ls4 : 1 1 1 
ls5 : 1 1 1 
ls6 : 1 1 1 
ls7 : 1 2 3 
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1
	- (1)と(2)は10.0当初からC++14のとおり実装されている。
	- (5)のオーバーロードも、10.0当初から、デフォルト実引数を用いずアロケータを引数に取るものと取らないもの、2つのオーバーロードで実現されている。
	- (8), (9)のオーバーロードは11.0から。
	- (3) `initializer_list`のオーバーロードは12.0から。


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (10)の経緯となる提案文書
- [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
    `explicit forward_list(const Allocator& a = Allocator())` を 2 つのオーバーロードに分割するきっかけとなったレポート
- [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
    `explicit forward_list(size_type n)` にアロケータ引数を追加するきっかけとなったレポート  
    なお、Discussion の例はアロケータの型が誤っているので注意
