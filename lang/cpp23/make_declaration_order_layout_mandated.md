# アクセス制御の異なるメンバ変数のレイアウトを宣言順に規定 [P1847R4]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
以下のようなアクセス制御の異なるメンバ変数のメモリレイアウトは、実装に対して自由に並び替えてよい、という規定になっていたが、これを宣言順に規定する。

```cpp
struct cell {
  int a;
private:
  double b;
public:
  std::string c;
};
```

実際に、自由に並び替えていた実装は存在しなかった。並び替えを許可する規定は、C++11でPOD (Plain Old Data) の見直しでスタンダードレイアウト型が導入される際に偶発的に入ったものであり、メモリレイアウトを不安定にする意図はなかった。

実装の慣行に従うためにも、アクセス制御が異なるメンバ変数であってもメモリレイアウトは宣言順であるという規定にする。


## 参照
- [P1847R4 Make declaration order layout mandated](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1847r4.pdf)
