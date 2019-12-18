# erase
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
void erase(iterator position);                             // (1) C++03 まで
iterator erase(const_iterator position);                   // (1) C++11 から

void erase(iterator first, iterator last);                 // (2) C++03 まで
iterator erase(const_iterator first, const_iterator last); // (2) C++11 から

size_type erase(const key_type& x);                        // (3)
```


## 概要
単一要素または要素範囲（`[first, last)`）を `multiset` コンテナから削除する。 
これは削除された要素の数だけコンテナの [`size`](size.md)`()` を減らし、それぞれの要素のデストラクタを呼び出す。


## パラメータ
- `position` : `multiset` から削除する単一要素を指すイテレータ。`iterator`、および、`const_iterator` はメンバ型であり、双方向イテレータとして定義される。
- `x` : `set` から削除される値。`key_type` はメンバ型であり、`multiset` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータであり、コンテナに格納される要素の型である。
- `first, last` : `multiset` コンテナ内の、削除される範囲 `[first, last)` を指定するイテレータ。ここでいう範囲は `first` と `last` の間の全ての要素を含み、`first` が指す要素を含むが `last` が指す要素は含まない。


## 戻り値
- (1), (2) :
    - C++03 まで : なし
    - C++11 から : 削除された要素の次を指すイテレータを返す。そのような要素がない場合、[`end()`](end.md)を返す(コンテナが空になった場合や、最後尾の要素を削除した場合)。
- (3) : 削除された要素の数を返す。


## 計算量
- (1) : 定数時間
- (2) : コンテナの [`size()`](size.md) についての対数時間と、それに加えて `first` と `last` の間の距離に対する線形時間。
- (3) : コンテナの [`size()`](size.md) について対数時間。


## 備考
- ループ中で `multiset` の要素を削除するためには、C++03 までは以下のようなコードを書く必要があった。
    ```cpp
    while (it != set_object.end()) {
      if (条件) {
        set_object.erase(it++);
      }
      else {
        ++it;
      }
    }
    ```

    - これは、`erase` で指定したイテレータが、対象となる要素が削除されることによって無効になるため、後置インクリメント `it++` を使用することで要素が削除されるより先に削除対象の次の要素を指すようにするためである。
    - このような書き方は C++11 以降でも依然として有効だが、`erase` が削除された次の要素を指すイテレータを返すようになったため、以下のようなコードを
    ```cpp
    set_object.erase(it++);
    ```

    - 以下のように書くこともできるようになった
    ```cpp
    it = set_object.erase(it);
    ```


## 例
### 基本的な使い方 (C++03)
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::multiset<int> c;

  c.insert(10);
  c.insert(10);
  c.insert(30);
  std::cout << c.size() << std::endl;

  c.erase(10);
  std::cout << c.size() << std::endl;

  c.erase(5);
  std::cout << c.size() << std::endl;

  c.erase(c.begin(), c.end());
  std::cout << c.size() << std::endl;
}
```
* erase[color ff0000]
* c.insert[link insert.md]
* c.size()[link size.md]
* c.begin()[link begin.md]
* c.end()[link end.md]

#### 出力
```
3
1
1
0
```

### イテレート中に要素を削除する (C++11)
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::multiset<int> c = {3, 1, 4};

  // イテレート中に要素削除をするような場合には、
  // 範囲for文は使用できない
  for (auto it = c.begin(); it != c.end();) {
    // 条件一致した要素を削除する
    if (*it == 1) {
      // 削除された要素の次を指すイテレータが返される。
      // C++03では、erase()の戻り値を使用せず、 c.erase(it++); のように書く
      it = c.erase(it);
    }
    // 要素削除をしない場合に、イテレータを進める
    else {
      ++it;
    }
  }

  for (const auto& x : c) {
    std::cout << x << std::endl;
  }
}
```

#### 出力
```
3
4
```


## 関連項目

| 名前                    | 説明                     |
|-------------------------|--------------------------|
| [`clear`](clear.md)   | 全ての要素を削除する     |
| [`insert`](insert.md) | 要素を挿入する           |
| [`find`](find.md)     | 指定したキーで要素を探す |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [LWG Issue 2258. `a.erase(q1, q2)` unable to directly return `q2`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2258)
    - C++11では、「`a.erase(q1, q2)`の結果として`q2`が返る」という仕様だったが、`const_iterator`型が渡された場合に`iterator`型を返せない問題があった。そのためC++14では、`q2`が指す要素を指すイテレータが返る、ということが明記された


