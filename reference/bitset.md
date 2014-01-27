#bitset
```cpp
namespace std {
  template <size_t N>
  class bitset;
}
```

##概要
`<bitset>`ヘッダでは、ビットの固定サイズ配列を計算するための`std::bitset`クラスを定義する。


###メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|----------------------------|----------------------------------------------------------|-------|
| `(constructor)` | コンストラクタ | |
| `(destructor)` | デストラクタ | |
| `bitset& operator=(const bitset&) = default` | 代入演算子 | |


###集合演算

| 名前 | 説明 | 対応バージョン |
|----------------------------|----------------------------------------------------------|-------|
| [`operator&=`](./bitset/op_and_assign.md)                | 論理積の複合演算 | |
| [<code>operator&#x7C;=</code>](./bitset/op_or_assign.md) | 論理和の複合演算 | |
| [`operator^=`](./bitset/op_xor_assign.md)                | 排他的論理和の複合演算 | |
| [`operator<<=`](./bitset/op_left_shift_assign.md)        | 左シフトの複合演算 | |
| [`operator>>=`](./bitset/op_right_shift_assign.md)       | 右シフトの複合演算 | |
| [`set`](./bitset/set.md)                                 | 任意の位置のビットを設定する | |
| [`reset`](./bitset/reset.md)                             | 任意の位置のビットを0にする | |
| [`operator~`](./bitset/op_flip.md)                       | ビットを反転させる | |
| [`flip`](./bitset/flip.md)                               | ビットを反転させる | |


###要素アクセス

| 名前 | 説明 | 対応バージョン |
|----------------------------|------------------------------------------------------|-------|
| [`operator[]`](./bitset/op_at.md) | 任意の位置のビットにアクセスする              | |
| [`count`](./bitset/count.md)      | 1になっているビットの数を取得する             | |
| [`size`](./bitset/size.md)        | ビット数を取得する                            | |
| [`test`](./bitset/test.md)        | 任意の位置のビットが1になっているかを判定する | |
| [`all`](./bitset/all.md)          | 全てのビットが1になっているかを判定する       | C++11 |
| [`any`](./bitset/any.md)          | いずれかのビットが1になっているかを判定する   | |
| [`none`](./bitset/none.md)        | 全てのビットが0になっているかを判定する       | |
| `to_ulong` | unsigned long型に変換する | |
| `to_ullong` | unsigned long long型に変換する | C++11 |
| `to_string` | 文字列に変換する | |
| [`operator==`](./bitset/op_equal.md)       | 等値比較 | |
| [`operator!=`](./bitset/op_not_equal.md)   | 非等値比較 | |
| [`operator<<`](./bitset/op_left_shift.md)  | 左シフト | |
| [`operator>>`](./bitset/op_right_shift.md) | 右シフト | |


###メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------|----------------------------------------------|-------|
| [`reference`](./bitset/reference.md) | 任意の位置のビットを参照するためのプロキシ型 | |


###非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------|-------------|-------|
| [`operator&`](./bitset/op_and.md)                | 論理積 | |
| [<code>operator&#x7C;</code>](./bitset/op_or.md) | OR演算 | |
| [`operator^`](./bitset/op_xor.md)                | XOR演算 | |
| `operator>>` | ストリームから入力 | |
| `operator<<` | ストリームに出力 | |


##例
```cpp
```

###出力
```
```

###参照

