# 基本文字集合に@、$、\`を追加[P2558R2]
* cpp26[meta cpp]
<!-- start lang caution -->
このページはC++26に採用される見込みの言語機能の変更を解説しています。
のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。
<!-- last lang caution -->
## 概要
基本文字集合に
$ (U+0024)
@ (U+0040)
` (U+0060)
の3文字を加える。  
CではC23で追加され、それに合わせるようにC++でも同様の変更を提案している。  
これにより、これらの文字を構文として使用でき、コードの可読性や他言語絵の移植性が向上する。
```cpp
#include <stdio.h>
#define STR(x) #x
int main()
{
  printf("%s", STR(\u0060)); // U+0060 は ` GRAVE ACCENT
}
```
## 参照
- [P2558R2 Add @, $, and ` to the basic character set](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2558r2.html)