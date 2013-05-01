#swap(非メンバ関数)
```cpp
namespace std {

  template <class T, class Container>
  void swap(queue<T, Container>& x, queue<T, Container>& y) noexcept(noexcept(x.swap(y)));

}
```

##概要

<b>2つのqueueオブジェクトを入れ替える</b>


##効果

x.[swap](/reference/queue/queue/swap.md)(y)



##戻り値

なし


##例外

`x.swap(y)` が例外を投げない場合、この関数は決して例外を投げない。


##備考



##例

```cpp
#include <iostream>
#include <queue>

template <class Queue>
void pop_print(Queue& que)
{
  while (!que.empty()) {
    std::cout << que.front() << " ";
    que.pop();
  }
  std::cout << std::endl;
}

int main ()
{
  std::queue<int> x;
  x.push(1);
  x.push(2);
  x.push(3);

  std::queue<int> y;
  y.push(4);
  y.push(5);
  y.push(6);

  std::swap(x, y);

  pop_print(x);
  pop_print(y);
}
```
* swap[color ff0000]

###出力

```cpp
4 5 6 
1 2 3 
```

##バージョン

###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) <h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)


##参照
