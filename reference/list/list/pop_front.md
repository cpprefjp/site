# pop_front
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void pop_front();
```

## 概要
先�要素を削除する


## 要件
[`empty()`](empty.md) `== false`であること。


## 戻り値
なし

## 例外

投げない

## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {1, 2, 3};

  ls.pop_front();

  for (int x : ls) {
    std::cout << x << std::endl;
  };
}
```
* pop_front()[color ff0000]


### 出力
```
2
3
```


