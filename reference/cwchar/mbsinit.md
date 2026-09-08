# mbsinit
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int mbsinit(const mbstate_t* ps);
}
```
* mbstate_t[link mbstate_t.md]

## 概要
変換状態が初期変換状態であるかを判定する。

初期変換状態とは、マルチバイト文字の途中まで読み込んだ状態や、特殊なシフト状態にない、変換の開始位置として使える状態のことである。


## 戻り値
`ps`がヌルポインタである場合、または`ps`が指す変換状態が初期変換状態を表す場合は`0`以外を返す。そうでなければ`0`を返す。


## 例
```cpp example
#include <iostream>
#include <cwchar>

int main()
{
  std::mbstate_t state{};

  // 値初期化したオブジェクトは初期変換状態
  std::cout << (std::mbsinit(&state) != 0) << std::endl;

  // ヌルポインタに対しても0以外を返す
  std::cout << (std::mbsinit(nullptr) != 0) << std::endl;
}
```
* std::mbsinit[color ff0000]
* std::mbstate_t[link mbstate_t.md]

### 出力
```
1
1
```


## 関連項目
- [`mbstate_t`](mbstate_t.md)
- [`mbrlen`](mbrlen.md)
