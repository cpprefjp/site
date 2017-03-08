#clear
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
void clear() noexcept;
```

##概要
`set` コンテナ内の全ての要素を削除する。それぞれのデストラクタが呼ばれ、コンテナから削除される。[`size()`](size.md) は 0 になる。


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <set>

int main ()
{
  std::set<int> c;

  c.insert(10);
  c.insert(20);
  c.insert(30);

  std::cout << c.size() << std::endl;

  c.clear();

  std::cout << c.size() << std::endl;
}
```
* clear()[color ff0000]
* c.insert[link insert.md]
* c.size()[link size.md]

###出力
```
3
0
```

##参照

| 名前                  | 説明                               |
|-----------------------|------------------------------------|
| [`erase`](erase.md) | 要素を削除する                     |
| [`size`](size.md)   | 要素数を取得する                   |
| [`empty`](empty.md) | コンテナが空であるかどうかを調べる |
