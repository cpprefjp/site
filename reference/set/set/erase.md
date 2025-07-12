# erase
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
void erase(iterator position);                             // (1) C++03 (C++11で一旦削除)
iterator erase(iterator position);                         // (1) C++17

iterator erase(const_iterator position);                   // (2) C++11

size_type erase(const key_type& x);                        // (3) C++03

template <class K>
size_type erase(K&& x);                                    // (4) C++23

void erase(iterator first, iterator last);                 // (5) C++03
iterator erase(const_iterator first, const_iterator last); // (5) C++11
```


## 概要
単一要素またはイテレータ範囲`[first, last)`を `set` コンテナから削除する。 
これは削除された要素の数だけコンテナの [`size`](size.md)`()` を減らし、それぞれの要素のデストラクタを呼び出す。

- (1) : 指定されたイテレータが指す要素を削除する
- (2) : 指定された読み取り専用イテレータが指す要素を削除する
- (3) : 指定されたキーをもつ要素を削除する
- (4) : `key_type`と比較可能な`K`型のキーを受け取って要素を削除する
- (5) : 指定されたイテレータ範囲の要素をすべて削除する


## パラメータ
- `position` : `set` から削除する単一要素を指すイテレータ。`iterator`、および、`const_iterator` はメンバ型であり、双方向イテレータとして定義される。
- `x` : `set` から削除される値。`key_type` はメンバ型であり、`set` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータであり、コンテナに格納される要素の型である。
- `first, last` : `set` コンテナ内の、削除されるイテレータ範囲 `[first, last)` を指定するイテレータ。ここでいう範囲は `first` と `last` の間の全ての要素を含み、`first` が指す要素を含むが `last` が指す要素は含まない。


## 戻り値
- (1) :
    - C++03 : 戻り値なし
    - C++17 : 削除された要素の次を指すイテレータを返す。そのような要素がない場合、[`end()`](end.md)を返す (要素を削除した結果としてコンテナが空になった場合)
- (2) : 削除された要素の次を指すイテレータを返す。そのような要素がない場合、[`end()`](end.md)を返す (要素を削除した結果としてコンテナが空になった場合)
- (3), (4) : 削除された要素の数を返す
- (5) :
    - C++03 : 戻り値なし
    - C++11 : 削除された要素の次を指すイテレータを返す。そのような要素がない場合、[`end()`](end.md)を返す (要素を削除した結果としてコンテナが空になった場合)


## 計算量
- (1), (2) : 定数時間
- (3), (4) : コンテナの [`size()`](size.md) について対数時間
- (5) : コンテナの [`size()`](size.md) について対数時間、それに加えて `first` と `last` の間の距離に対する線形時間


## 備考
- (1) : C++17で再追加されたこのオーバーロードは、それ以前の言語バージョンから使用できる可能性がある
- (1), (2) : この関数に、範囲外のイテレータ (終端イテレータを含む) を指定した場合の動作は未定義
- 削除された要素を指すイテレータ、および、参照のみ無効になる。なお、規格書に明確な記載は無いが、削除された要素を指すポインタも無効になる。
- ループ中で `set` の要素を削除するためには、C++03 までは以下のようなコードを書く必要があった。
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
  std::set<int> c;

  c.insert(10);
  c.insert(20);
  c.insert(30);
  std::cout << c.size() << std::endl;

  c.erase(10);
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
2
0
```


### イテレート中に要素を削除する (C++11)
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int> c = {3, 1, 4};

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
    - C++11で、`erase(iterator)`を`erase(const_iterator)`に変更
- [LWG Issue 2258. `a.erase(q1, q2)` unable to directly return `q2`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2258)
    - C++11では、「`a.erase(q1, q2)`の結果として`q2`が返る」という仕様だったが、`const_iterator`型が渡された場合に`iterator`型を返せない問題があった。そのためC++14では、`q2`が指す要素を指すイテレータが返る、ということが明記された
- [LWG Issue 2059. C++0x ambiguity problem with `map::erase`](https://cplusplus.github.io/LWG/issue2059)
    - C++17で、`erase(iterator)`を再追加
- [P2077R3 Heterogeneous erasure overloads for associative containers](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2077r3.html)
    - C++23で、`template <class K> erase(K&& x)`のオーバーロードが追加された
