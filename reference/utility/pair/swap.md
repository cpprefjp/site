# swap
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* function[meta id-type]

```cpp
void swap(pair& p) noexcept(下記参照);
```

## 概要
他の`pair`オブジェクトと値を入れ替える


## 要件
`first_type`と`second_type`が`Swappable`であること。


## 効果
`swap(this->first, p.first);`

`swap(this->second, p.second);`


## 戻り値
なし


## 例外
`noexcept(swap(first, p.first)) && noexcept(swap(second, p.second))`である場合、この関数は決して例外を送出しない


## 例
```cpp
#include <iostream>
#include <utility>
#include <string>

template <class T1, class T2>
void print(const std::string& name, const std::pair<T1, T2>& p)
{
  std::cout << name << " : (" << p.first << "," << p.second << ")" << std::endl;
}

int main()
{
  std::pair<int, std::string> p1(1, "aaa");
  std::pair<int, std::string> p2(2, "bbb");

  p1.swap(p2);

  print("p1", p1);
  print("p2", p2);
}
```
* swap[color ff0000]

### 出力
```
p1 : (2,bbb)
p2 : (1,aaa)
```

## 参照


