#swap
* list[meta header]
* std[meta namespace]

```cpp
void swap(list& x);
```

##概要
他の`list`オブジェクトと値を入れ替える。


##効果
`*this`の内容を`x`と交換する。


##戻り値
なし


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls1 = {1, 2, 3};
  std::list<int> ls2 = {4, 5, 6};

  ls1.swap(ls2);

  for (int x : ls1) {
    std::cout << x << std::endl;
  }

  std::cout << std::endl;

  for (int x : ls2) {
    std::cout << x << std::endl;
  }
}
```
* swap[color ff0000]

###出力
```
4
5
6

1
2
3
```


