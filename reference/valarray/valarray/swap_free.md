#swap(非メンバ関数) (C++11)
```cpp
namespace std {
  template <class T>
  void swap(valarray<T>& x, valarray<T>& y) noexcept;
}
```

##概要
2つの`valarray`オブジェクトを入れ替える。


##効果
`x.`[`swap`](./swap.md)`(y)`


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <valarray>

template <class T>
void print(const char* name, const std::valarray<T>& v)
{
  std::cout << name << " : {";
  bool first = true;

  for (const T& x : v) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  std::valarray<int> a = {1, 2, 3};
  std::valarray<int> b = {4, 5, 6};

  std::swap(a, b);

  print("a", a);
  print("b", b);
}
```

###出力
```
a : {4,5,6}
b : {1,2,3}
```


