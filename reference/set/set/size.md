#size
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
size_type size() const noexcept;
```

##概要
コンテナ内の要素の数を返す。


##戻り値
`set` コンテナに格納されている要素の数を返す。  
メンバ型 `size_type` は符号なし整数型である。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <set>

int main ()
{
  std::set<int> c;

  std::cout << c.size() << std::endl;

  c.insert(1);
  c.insert(2);
  c.insert(3);
  c.insert(1);

  std::cout << c.size() << std::endl;
}
```
* size()[color ff0000]
* insert[link insert.md]

###出力
```
0
3
```

##参照

| 名前                        | 説明                               |
|-----------------------------|------------------------------------|
| [`max_size`](max_size.md) | 格納可能な最大の要素数を取得する   |
| [`empty`](empty.md)       | コンテナが空であるかどうかを調べる |
