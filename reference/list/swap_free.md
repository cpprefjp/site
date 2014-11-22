#swap (非メンバ関数)
```cpp
namespace std {
  template <class T, class Allocator>
  void swap(list<T, Allocator>& x, list<T, Allocator>& y);
}
```

##概要
2つの`list`オブジェクトを入れ替える



##効果
`x.`[`swap`](./swap.md)`(y)`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <list>
#include <string>

template <class T>
void print(const std::string& name, const std::list<T>& ls)
{
  std::cout << name << " : {";
  for (const T& x : ls) {
    std::cout << x << ' ';
  }
  std::cout << "}" << std::endl;
}

int main()
{
  std::list<int> ls1 = {4, 5, 6};
  std::list<int> ls2 = {1, 2, 3};

  std::swap(ls1, ls2);

  print("ls1", ls1);
  print("ls2", ls2);
}
```
* swap[color ff0000]

###出力
```
ls1 : {1 2 3 }
ls2 : {4 5 6 }
```


