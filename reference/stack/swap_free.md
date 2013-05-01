#swap(非メンバ関数)
```cpp
namespace std {

  template <class T, class Container>
  void swap(stack<T, Container>& x, stack<T, Container>& y) noexcept(noexcept(x.swap(y)));

}
```

##概要

<b>2つの stack オブジェクトを入れ替える。</b>


##効果

`x.swap(y)`

##戻り値

なし


##例外

`x.swap(y)` が例外を投げない場合、この関数は決して例外を投げない。

##計算量



##備考



##例

```cpp
#include <iostream>
#include <stack>

int main ()
{
  std::stack<int>  x;
  x.push(3);
  x.push(1);
  x.push(4);

  std::stack<int>  y;
  y.push(2);
  y.push(7);
  y.push(1);

  // 交換
  std::swap(x, y);

  // それぞれの要素を表示
  std::cout << "x : ";
  while (!x.empty()) {
    std::cout << x.top() << " ";
    x.pop();
  }

  std::cout << std::endl;

  std::cout << "y : ";
  while (!y.empty()) {
    std::cout << y.top() << " ";
    y.pop();
  }

}
```
* swap[color ff0000]

###出力

```cpp
x : 1 7 2 
y : 4 1 3 
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): 1.9, 2.9, 3.1
- [GCC](/implementation#gcc.md): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation#icc.md): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```