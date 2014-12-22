#erase
```cpp
void erase(iterator position);                             // (1) C++03
iterator erase(const_iterator position);                   // (1) C++11

size_type erase(const key_type& x);                        // (2)

void erase(iterator first, iterator last);                 // (3) C++03
iterator erase(const_iterator first, const_iterator last); // (3) C++11
```


##概要
単一要素または要素範囲（`[first, last)`）を `multimap` コンテナから削除する。

これは削除された要素の数だけコンテナの `size` を減らし、それぞれの要素のデストラクタを呼び出す。


##パラメータ
- `position` : `multimap` から削除する単一要素を指すイテレータ。`iterator` はメンバ型であり、双方向イテレータとして定義される。
- `x` : `multimap` から削除される値のキー。`key_type` はメンバ型であり、`multimap` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータであり、コンテナに格納される要素のキーの型である。
- `first, last` : `multimap` コンテナ内の、削除される範囲 `[first, last)` を指定するイテレータ。ここでいう範囲は `first` と `last` の間の全ての要素を含み、`first` が指す要素を含むが `last` が指す要素は含まない。


##戻り値
- (1), (3)
	- C++03 : 戻り値なし
	- C++11 : 削除された要素の次を指すイテレータを返す。
- (2) 削除された要素の数を返す。　


##計算量
- (1) 定数時間。
- (2) コンテナの [`size()`](/reference/map/map/size.md) について対数時間。
- (3) コンテナの [`size()`](/reference/map/map/size.md) について対数時間、それに加えて `first` と `last` の間の距離に対する線形時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  multimap<int, char> c;

  c.insert(std::make_pair(1,'A'));
  c.insert(std::make_pair(2,'B'));
  c.insert(std::make_pair(3,'C'));
  cout << c.size() << endl;

  c.erase(1);
  cout << c.size() << endl;

  c.erase(5);
  cout << c.size() << endl;

  c.erase(c.begin(), c.end());
  cout << c.size() << endl;

  return 0;
}
```

###出力
```
3
2
2
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前 | 説明|
|---------------------------------------------------------------------------------------|--------------------------------------|
| [`multimap::clear`](/reference/map/multimap/clear.md) | 全ての要素を削除する |
| [`multimap::insert`](/reference/map/multimap/insert.md) | 要素を挿入する |
| [`multimap::find`](/reference/map/multimap/find.md) | 指定したキーで要素を探す |



