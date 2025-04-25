# 不完全型へのポインタに対するdeleteを不適格とする [P3144R2]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<!-- last lang caution -->

## 概要
宣言のみで定義がない不完全型へのポインタへの`delete`は、これまで未定義動作を引き起こす操作になっていた。

C++26ではこれを不適格とし、コンパイル時エラーとする。

```cpp
class C;          // 不完全型の宣言
C* cp = nullptr;  // 不完全型へのポインタはOK
delete cp;        // C++23:未定義動作, C++26:コンパイルエラー
```


## 参照
- [P3144R2 Deleting a Pointer to an Incomplete Type Should be Ill-formed](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3144r2.pdf)
