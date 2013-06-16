#コンストラクタ
```cpp
explicit vector(const Allocator& a = Allocator());
explicit vector(size_type n);
explicit vector(size_type n, const T& value, const Allocator& a = Allocator());
template <class InputIter> vector(InputIter first, InputIter last, const Allocator& a = Allocator());
vector(const vector& x);
vector(vector&& x);
vector(const vector& x, const Allocator& a);
vector(vector&& x, const Allocator& a);
vector(initializer_list<T> il, const Allocator& a = Allocator());
```
* initializer_list[link /reference/initializer_list.md]

##`vector`の構築
`vector`オブジェクトを次に示す通りの要素で初期化する。

### 定義

* `explicit vector(const Allocator& a = Allocator());`
    * デフォルトコンストラクタ。`size() == 0`の要素を持たない空の`vector`を構築する。
* `explicit vector(size_type n);`
    * n個のT()初期化された要素を保持したvectorを構築する。
* `explicit vector(size_type n, const T& value, const Allocator& a = Allocator());`
    * 繰り返しシーケンスコンストラクタ。`value`のコピーを`n`個要素として保持した`vector`を構築する。
* `template <class InputIter> vector(InputIter first, InputIter last, const Allocator& a = Allocator());`
    * イテレータ範囲コンストラクタ。`[first, last)`の範囲を要素としてコピーした`vector`を構築する。
* `vector(const vector& x);`
    * コピーコンストラクタ。`x`と同じ要素を保持した`vector`を構築する。
* `vector(vector&& x);` (C++11から)
    * ムーブコンストラクタ。`x`の指す先を自分の領域として`vector`を構築する。
* `vector(const vector& x, const Allocator& a);` (C++11から)
    * アロケータを別で受け取り、`vector`をコピー構築する。
* `vector(vector&& x, const Allocator& a);` (C++11から)
    * アロケータを別で受け取り、`vector`をムーブ構築する。
* `vector(initializer_list<T> il, const Allocator& a = Allocator());` (C++11から)
    * 初期化子リストを受け取るコンストラクタ。`vector(first, last, alloc)`と等価。

### パラメータ
* `n`
    * `value`の繰り返し個数。`size_type`メンバ型は符号なし整数。
* `value`
    * コンテナの要素として`n`個繰り返される値。`T`は1番目のテンプレートパラメータ(要素の型)。
* `first`, `last`
    * 入力イテレータの組。`[first, last)`の範囲を全てコンテナの要素としてコピーする。
* `x`
    * コピー(ムーブ)元の同じテンプレートパラメータを持った`vector`オブジェクト。
* `a`
    * 新しく生成する代わりに使用されるべき`Allocator`オブジェクト。標準の`std::allocator`を使う限り指定する意味は無い。


###計算量:
デフォルトコンストラクタは定数時間。

繰り返しシーケンスコンストラクタは`n`に対して線形時間。

イテレータペアコンストラクタは`distance(first, last)`に対して線形時間。ランダムアクセスイテレータでない場合は要素数が分からないため、再確保のコストが(対数オーダで)別途発生する。

コピーコンストラクタは`x.size()`に対して線形時間。

ムーブコンストラクタは定数時間。

##例
```cpp
#include <vector>

#include <iostream>
#include <string>
#include <algorithm> // std::for_each

template <class T>
void print(const std::string& name, const std::vector<T>& v)
{
  std::cout << "name : {";
  std::for_each(v.begin(), v.end(), [](const T& x) { std::cout << x << " "; });
  std::cout << "}" << std::endl;
}

int main ()
{
  std::vector<int> first;                               // int型の空のvectorを構築
  std::vector<int> second(4, 100);                      // 4個のint値からなるvectorを構築し、全ての値を100で初期化
  std::vector<int> third(second.begin(),second.end());  // secondのイテレータ範囲からvectorを構築
  std::vector<int> fourth(third);                       // thirdをコピー

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

###出力
```
name : {}
name : {100 100 100 100 }
name : {100 100 100 100 }
name : {100 100 100 100 }
name : {16 2 77 29 }
name : {1 2 3 }
```


