#swap
```cpp
void swap(thread& x) noexcept;
```

##概要

別の`thread`と交換する。


##効果

`*this`と`x`を入れ替える。


##例外

送出しない。


##例

```cpp
#include <thread>int main(){  std::thread th1([]{ /*...*/ });  std::thread th2;  th1.swap(th2);  th2.join();  return 0;}
```

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md):
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.3, 4.7.0
- [ICC](/implementation#icc.md):
- [Visual C++](/implementation#visual_cpp.md):<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```