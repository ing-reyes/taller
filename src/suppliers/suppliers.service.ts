import { Injectable } from "@nestjs/common";

import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { SupplierEntity } from "./entities/supplier.entity";
import { ManagerError } from "src/common/errors/manager.error";
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { ResponseAllSuppliers } from "./interfaces/response-suppliers.interface";

@Injectable()
export class SuppliersService {

    private suppliers: SupplierEntity[] = [
        { id: 1, name: 'carlos', email: 'carlos@google.com', address: 'bobare', phone: '63262376', isActive: true },
        { id: 2, name: 'maria', email: 'maria@google.com', address: 'bobare', phone: '63262376', isActive: true },
        { id: 3, name: 'jose', email: 'jose@google.com', address: 'bobare', phone: '63262376', isActive: true },
        { id: 4, name: 'marla', email: 'marla@google.com', address: 'bobare', phone: '63262376', isActive: true },
    ];

    async create(createSupplierDto: CreateSupplierDto): Promise<SupplierEntity> {
        try {
            const supplier: SupplierEntity = {
                ...createSupplierDto,
                isActive: true,
                id: this.suppliers.length + 1,
            }

            this.suppliers.push(supplier);

            return supplier;
        } catch (error) {

        }
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseAllSuppliers> {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            if (this.suppliers.length === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Suppliers not found!',
                })
            }

            const total = this.suppliers.filter((supplier) => supplier.isActive === true).length;
            const lastPage = Math.ceil(total / limit);
            const data = this.suppliers.filter((supplier) => supplier.isActive === true).slice(skip, limit);

            return {
                page,
                limit,
                lastPage,
                total,
                data,
            };
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findOne(id: number): Promise<SupplierEntity> {
        try {
            const supplier = this.suppliers.find((supplier) => supplier.id === id && supplier.isActive === true);
            if (!supplier) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Supplier not found',
                });
            }
            return supplier;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<SupplierEntity> {
        try {
            const indexSupplier = this.suppliers.findIndex((supplier) => supplier.id === id && supplier.isActive === true);
            if (indexSupplier === -1) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Supplier not found',
                });
            }

            this.suppliers[indexSupplier] = {
                ...this.suppliers[indexSupplier],
                ...updateSupplierDto,
            }
            return this.suppliers[indexSupplier]
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async remove(id: number): Promise<SupplierEntity> {
        try {
            const indexSupplier = this.suppliers.findIndex((supplier) => supplier.id === id && supplier.isActive === true);
            if (indexSupplier === -1) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Supplier not found',
                });
            }

            this.suppliers[indexSupplier] = {
                ...this.suppliers[indexSupplier],
                isActive: false,
            }

            return this.suppliers[indexSupplier]

        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }
}