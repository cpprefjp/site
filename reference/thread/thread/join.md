#join
```cpp
void join();
```

##概要

スレッドが終了するまで待機する


##要件

`thread`オブジェクトにスレッドが関連付けられていること(`[joinable()](/reference/thread/thread/joinable.md) == true`)。


##効果

`this`に関連付けれられたスレッドが完了するまで、この関数を呼び出したスレッドをブロックする。


##同期

関連付けられたスレッドの完了は、`join()`メンバ関数の正常リターンと<u>同期する</u>。つまり、「`this`に関連付けられたスレッドT1上で行われる全処理の完了」は、「`join()`メンバ関数を呼び出したスレッドT0上での同メンバ関数からの正常リターン」よりも<u>前に発生する</u>。


##事後条件

`this`は何も指さない空の`thread`オブジェクトとなる。


##例外

join操作に失敗した場合、[`system_error`](/reference/system_error/system_error.md)例外を投げる。



##備考



##例

```cpp
#include <cassert>
#include <thread>int main(){  int x = 0;  std::thread thd([&]{ ++x; });  // ここでxにアクセスするとdata raceにより未定義動作  thd.join();  // 別スレッド上で行われた全処理が完了している  assert(x == 1);   return 0;}
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