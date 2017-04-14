# swap (非メンバ関数)
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T1, class T2>
  void swap(pair<T1,T2>& x, pair<T1,T2>& y) noexcept(noexcept(x.swap(y)));
}
```

## 概要
2つの`pair`オブジェクトを入れ替える


## 効果
```cpp
x.swap(y);
```

## 戻り値
なし


## 例外
式`x.swap(y))`が例外を投げない場合、この関数は決して例外を送出しない


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

  std::swap(p1, p2);

  print("p1", p1);
  print("p2", p2);
}
```
* std::swap[color ff0000]

### 出力
```
p1 : (2,bbb)
p2 : (1,aaa)
```

## 参照


