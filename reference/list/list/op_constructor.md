# コンストラクタ
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
list();                                          // (1) C++14 から
list(const Allocator& a);                        // (2) C++14 から
explicit list(const Allocator& a = Allocator()); // (1), (2) C++11 まで。C++14 で削除

explicit list(size_type n, const T& value = T(),
     const Allocator& a = Allocator());          // (3) C++03 まで。C++11 で削除
list(size_type n, const T& value,
     const Allocator& a = Allocator());          // (3) C++11 から

explicit list(size_type n);                      // (4) C++11。C++14 で削除
explicit list(size_type n,
              const Allocator& a = Allocator()); // (4) C++14 から

template <class InputIterator>
list(InputIterator first, InputIterator last,
     const Allocator& a = Allocator());          // (5)

list(const list& x);                             // (6)
list(list&& x);                                  // (7) C++11 から
list(const list& x, const Allocator& a);         // (8) C++11 から
list(list&& x, const Allocator& a);              // (9) C++11 から

list(initializer_list<T> il,
     const Allocator& a = Allocator());          // (10) C++11 から
```
* initializer_list[link /reference/initializer_list.md]


## 概要
list オブジェクトの構築


## 効果
- (1) : デフォルトコンストラクタ。アロケータをデフォルト構築して、空のコンテナを作る。
- (2) : アロケータを指定して空のコンテナを作る。
- (3) : `value` のコピーを `n` 個要素として保持した `list` を構築する。
- (4) : `n` 個の `T()` 初期化された要素を保持した `list` を構築する。
- (5) : `[first, last)` の範囲を要素としてコピーした `list` を構築する。
- (6) : コピーコンストラクタ。`x` と同じ要素を保持した `list` を構築する。
- (7) : ムーブコンストラクタ。`x` の指す先を自分の領域として `list` を構築する。
- (8) : アロケータを指定したコピーコンストラクタ。
- (9) : アロケータを指定したムーブコンストラクタ。
- (10) : 初期化子リストを受け取るコンストラクタ。`list(il.`[`begin`](../initializer_list/begin.md)`(), il.`[`end`](../initializer_list/end.md)`(), a)` と同等。


## 計算量
- (1), (2) : 定数時間
- (3), (4) : `n` に対して線形時間
- (5) : [`distance`](/reference/iterator/distance.md)`(first, last)` に対して線形時間
- (6), (8) : `x.`[`size`](size.md)`()` に対して線形時間
- (7) : 定数時間
- (9) : `a == x.`[`get_allocator`](get_allocator.md)`()` であれば定数時間。そうでなければ `x.`[`size`](size.md)`()` に対して線形時間


## 備考
- (5) の形式は、C++03 までは `InputIterator` が整数型の場合には `list(static_cast<typename list::size_type>(first), static_cast<typename list::value_type>(last), a)` と同等とされていたが、C++11 では `InputIterator` が入力イテレータの要件を満たさなければオーバーロード解決に参加しないように変更された。
- C++11 では、(3) の形式の引数 `value` に関するデフォルト引数が削除され、新たに (4) の形式が追加された。  
	これは、デフォルト引数を使用すると、引数 `value` のデフォルト初期化 1 回＋`list` の要素へのコピー初期化 `n` 回のコンストラクタ呼び出しが必要となるが、デフォルト引数でなければ `list` の要素へのデフォルト初期化 `n` 回のコンストラクタ呼び出しで済むためである。

- C++14 では、(1) の形式と (2) の形式がデフォルト引数を使用しない 2 つのオーバーロードに分割された。  
	これは、デフォルトコンストラクタに `explicit` が付いていると、

    ```cpp
    std::list<int> l = {};
    ```

	のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。

- C++14 では、(4) の形式に引数が追加された。  
	これは、変更されないと `n` のみを引数にとるアロケータ使用構築（uses-allocator construction）に失敗してしまうためである。
	具体的には、C++11 では以下のようなコードがエラーになってしまう。

    ```cpp example
    #include <list>
    #include <vector>
    #include <scoped_allocator>

    int main()
    {
      using li = std::list<int>;
      std::vector<li, std::scoped_allocator_adaptor<std::allocator<li>>> v;
      v.emplace_back(10u);
    }
    ```
    * std::scoped_allocator_adaptor[link ../scoped_allocator/scoped_allocator_adaptor.md]
    * std::allocator[link ../memory/allocator.md]
    * emplace_back[link ../vector/emplace_back.md]


## 例
```cpp example
#include <iostream>
#include <list>
#include <string>
#include <utility>

template <class T>
void print(const std::string& name, const std::list<T>& ls)
{
  std::cout << name << " : ";
  for (const T& x : ls) {
    std::cout << x << " ";
  }
  std::cout << std::endl;
}

int main ()
{
  // デフォルト構築
  std::list<int> ls1;
  print("ls1", ls1);

  // n 個の要素を持つリストを作成
  std::list<int> ls2(3);
  print("ls2", ls2);

  // n 個の指定された値を要素に持つリストを作成
  std::list<int> ls3(3, 1);
  print("ls3", ls3);

  // 範囲から構築
  std::list<int> ls4(ls3.begin(), ls3.end());
  print("ls4", ls4);

  // コピー構築
  std::list<int> ls5 = ls4;
  print("ls5", ls5);

  // ムーブ構築
  std::list<int> ls6 = std::move(ls5);
  print("ls6", ls6);

  // 初期化子リストで構築
  std::list<int> ls7 = { 1, 2, 3 };
  print("ls7", ls7);
}
```
* std::move[link ../utility/move.md]
* ls3.begin()[link begin.md]
* ls3.end()[link end.md]

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


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (10)の経緯となる提案文書
- [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
	`explicit list(const Allocator& a = Allocator())` を 2 つのオーバーロードに分割するきっかけとなったレポート
- [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
	`explicit list(size_type n)` にアロケータ引数を追加するきっかけとなったレポート  
	なお、Discussion の例はアロケータの型が誤っているので注意
