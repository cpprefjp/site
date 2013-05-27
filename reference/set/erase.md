#erase
```cpp
// until C++11
void erase(iterator position);

// since C++11
iterator erase(const_iterator position);

// until C++11
void erase(const_iterator first, const_iterator last);

// since C++11
iterator erase(const_iterator first, const_iterator last);

size_type erase(const key_type& x);
```


##概要
単一要素または要素範囲（`[first, last)`）を `set` コンテナから削除する。 
これは削除された要素の数だけコンテナの `size` を減らし、それぞれの要素のデストラクタを呼び出す。


##パラメータ
- `position` : `set` から削除する単一要素を指すイテレータ。`iterator` はメンバ型であり、双方向イテレータとして定義される。
- `x` : `set` から削除される値。`key_type` はメンバ型であり、`set` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータであり、コンテナに格納される要素の型である。
- `first, last` : `set` コンテナ内の、削除される範囲 `[first, last)` を指定するイテレータ。ここでいう範囲は `first` と `last` の間の全ての要素を含み、`first` が指す要素を含むが `last` が指す要素は含まない。


##戻り値
`iterator` を返すタイプのバージョンは、削除された要素の次を指すイテレータを返す。 
`size_type` を返すタイプのバージョンは、削除された要素の数を返す。　


##計算量
引数に `position` をとるバージョンは定数時間。 
引数に `first` 、`last` をとるバージョンはコンテナの [`size()`](./size.md) についての対数時間、プラス `first` と `last` の間の距離に対する線形時間。 
引数に `x` をとるバージョンはコンテナの [`size()`](./size.md) について対数時間。


##例
```cpp
#include <iostream>
#include <set>
using namespace std;
 
int main()
{
  set<int> c;
 
  c.insert(10);
  c.insert(20);
  c.insert(30);
  cout << c.size() << endl;
 
  c.erase(10);
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

##参照

| | |
|---------------------------------------------------------------------------------------|--------------------------------------|
| [`clear`](./clear.md) | 全ての要素を削除する |
| [`insert`](./insert.md) | 要素を挿入する |
| [`find`](./find.md) | 指定したキーで要素を探す |



