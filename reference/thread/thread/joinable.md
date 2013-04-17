#joinable
```cpp
bool joinable() const noexcept;
```

##概要

`thread`オブジェクトがスレッドと関連付けられているか否か取得する。<b>
</b>


##戻り値

スレッドと関連付けられているなら`true`を、そうでなければ`false`を返す。


##例外

送出しない。


##例

```cpp
#include <cassert>
#include <thread>int main(){  std::thread thd([]{ /*...*/ });  assert(thd.joinable());  thd.join();  assert(!thd.joinable());  return 0;}
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

- [Visual C++](/implementation#visual_cpp.md)
<h4>備考</h4>

(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```