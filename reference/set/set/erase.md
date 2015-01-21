#erase
```cpp
void erase(iterator position);                             // (1) C++03
iterator erase(const_iterator position);                   // (1) C++11

void erase(const_iterator first, const_iterator last);     // (2) C++03
iterator erase(const_iterator first, const_iterator last); // (2) C++11

size_type erase(const key_type& x);                        // (3)
```


##概要
単一要素または要素範囲（`[first, last)`）を `set` コンテナから削除する。 
これは削除された要素の数だけコンテナの [`size`](size.md)`()` を減らし、それぞれの要素のデストラクタを呼び出す。


##パラメータ
- `position` : `set` から削除する単一要素を指すイテレータ。`iterator` はメンバ型であり、双方向イテレータとして定義される。
- `x` : `set` から削除される値。`key_type` はメンバ型であり、`set` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータであり、コンテナに格納される要素の型である。
- `first, last` : `set` コンテナ内の、削除される範囲 `[first, last)` を指定するイテレータ。ここでいう範囲は `first` と `last` の間の全ての要素を含み、`first` が指す要素を含むが `last` が指す要素は含まない。


##戻り値
- (1), (2) :
    - C++03 : なし
    - C++11 : 削除された要素の次を指すイテレータを返す。
- (3) : 削除された要素の数を返す。　


##計算量
- (1) : 定数時間
- (2) : コンテナの [`size()`](./size.md) についての対数時間と、それに加えて `first` と `last` の間の距離に対する線形時間。 
- (3) : コンテナの [`size()`](./size.md) について対数時間。

##例
```cpp
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

  c.erase(5);
  std::cout << c.size() << std::endl;

  c.erase(c.begin(), c.end());
  std::cout << c.size() << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* insert[link insert.md]
* erase[color ff0000]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* size[link size.md]
* begin[link begin.md]
* end[link end.md]

###出力
```
3
2
2
0
```

##参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)


##関連項目

| 名前                    | 説明                     |
|-------------------------|--------------------------|
| [`clear`](./clear.md)   | 全ての要素を削除する     |
| [`insert`](./insert.md) | 要素を挿入する           |
| [`find`](./find.md)     | 指定したキーで要素を探す |
