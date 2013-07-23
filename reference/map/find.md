#find
```cpp
iterator find(const key_type& x);
const_iterator find(const key_type& x) const;
```

##概要
コンテナ内でキーが `x` である要素を検索し、見つかった場合はそれへのイテレータを返し、見つからなかった場合は [`end()`](./end.md) （コンテナの最後の要素の次）を指すイテレータを返す。


##パラメータ
- `x` : 検索するキー。`key_type` は `map` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。


##戻り値
指定した値が見つかった場合はその要素へのイテレータ、そうでない場合は [`end()`](./end.md) へのイテレータ。`iterator` はメンバ型であり、`map` においては双方向イテレータとして定義される。


##計算量
[`size`](./size.md) について対数時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  map<int, char> c;

  c.insert(std::make_pair(1,'a'));

  cout << (c.find(1) != c.end()) << endl;
  cout << (c.find(2) != c.end()) << endl;
  return 0;
}
```

###出力
```
1
0
```

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0

##参照

| 名前 | 説明|
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`count`](./count.md) | 指定したキーにマッチする要素の数を返す |
| [`lower_bound`](./lower_bound.md) | 与えられた値より小さくない要素へのイテレータを返す |
| [`upper_bound`](./upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


