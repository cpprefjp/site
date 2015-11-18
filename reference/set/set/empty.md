#empty
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
bool empty() const noexcept;
```

##概要
コンテナが空かどうかをテストする。 
`set` コンテナが空（[`size()`](size.md) が 0）の場合に `true` を返す。 

この関数はコンテナ内のコンテンツを変化させない。コンテンツをクリアするには [`clear()`](clear.md) メンバを使う。


##戻り値
コンテナサイズが 0 のときに `true`, そうでないときに `false`。


##計算量
定数時間。


##例
```cpp
#include <iostream>
#include <set>

int main ()
{
  std::set<int> c;

  std::cout << c.empty() << std::endl;

  c.insert(42);

  std::cout << c.empty() << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* cout[link ../../iostream/cout.md]
* empty[color ff0000]
* endl[link ../../ostream/endl.md]
* insert[link insert.md]

###出力
```
1
0
```

##参照

| 名前                                   | 説明           |
|----------------------------------------|----------------|
| [`insert`](insert.md)                | 要素を挿入する |
| [`(constructor)`](op_constructor.md) | コンストラクタ |
