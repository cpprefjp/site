#Destructible
* concepts[meta header]
* std[meta namespace]

任意の型`T`の変更可能な左辺値オブジェクト`u`について、以下の式が可能であること：

```cpp
u.~T()
```

- この式を実行した結果として、オブジェクト`u`が所有する全てのリソースが回収され、例外を伝搬しないこと


