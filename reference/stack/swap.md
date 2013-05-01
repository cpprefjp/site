#swap
```cpp
void swap(stack& s) noexcept(noexcept(swap(c, s.c)));
```

##概要

<b>他の stack オブジェクトと値を入れ替える。</b>


##効果

`swap(c, s.c)`

##戻り値

なし


##例外

`swap(c, s.c)` が例外を投げない場合、この関数は決して例外を投げない。



##計算量



##備考



##例

```cpp
#include <iostream>
#include <stack>

int main ()
{
  std::stack<int>  st0;
  st0.push(3);
  st0.push(1);
  st0.push(4);

  std::stack<int>  st1;
  st1.push(2);
  st1.push(7);
  st1.push(1);

  // 交換
  st0.swap(st1);

  // それぞれの要素を表示
  std::cout << "st0 : ";
  while (!st0.empty()) {
    std::cout << st0.top() << " ";
    st0.pop();
  }

  std::cout << std::endl;

  std::cout << "st1 : ";
  while (!st1.empty()) {
    std::cout << st1.top() << " ";
    st1.pop();
  }
}
```

###出力

```cpp
st0 : 1 7 2 
st1 : 4 1 3 
```

##バージョン


###言語


- C++11



###処理系


- [Clang](/implementation#clang.md): 1.9, 2.9, 3.0

- [GCC](/implementation#gcc.md): 3.4.6, 4.2.4, 4.3.6, 4.4.7, 4.5.3, 4.6.3, 4.7.0

- [GCC, C++0x mode](/implementation#gcc.md): 4.3.6, 4.4.7, 4.5.3, 4.6.3, 4.7.0

- [ICC](/implementation#icc.md): 10.1, 11.0, 11.1, 12.0

- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0
<h4>備考</h4>

(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
void swap(stack& s) noexcept(noexcept(swap(c, s.c))) { using std::swap; swap(c, s.c); }
```

##参照


